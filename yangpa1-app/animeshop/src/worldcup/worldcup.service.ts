// src/worldcup/worldcup.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorldcupDto } from './dto/create-worldcup.dto';

@Injectable()
export class WorldcupService {
  constructor(private prisma: PrismaService) {}

  // 1. 월드컵 및 후보 등록 (Create)
  async create(dto: CreateWorldcupDto) {
    return this.prisma.worldcup.create({
      data: {
        title: dto.title,
        desc: dto.desc,
        items: {
          create: dto.items, // 연관된 후보 아이템들을 한 번에 생성합니다.
        },
      },
      include: {
        items: true,
      },
    });
  }

  // 2. 전체 월드컵 목록 조회 (Read List)
  async findAll() {
    return this.prisma.worldcup.findMany({
      select: {
        id: true,
        title: true,
        desc: true,
        views: true,
        createdAt: true,
        _count: {
          select: { items: true }, // 등록된 후보가 총 몇 명인지 개수만 포함
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. 특정 월드컵 게임 시작용 데이터 조회 (Read One + Shuffle)
  // src/worldcup/worldcup.service.ts

  // 특정 월드컵 게임 시작용 데이터 조회 (Read One + Shuffle + Limit)
  async getGameItems(id: number, round?: number) {
    const worldcup = await this.prisma.worldcup.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!worldcup) {
      throw new NotFoundException('존재하지 않는 월드컵 게임입니다.');
    }

    // 1. 후보 리스트를 먼저 무작위로 완전히 섞어줍니다.
    let shuffledItems = worldcup.items.sort(() => Math.random() - 0.5);

    // 2. 만약 프론트엔드가 강수(예: 8 또는 16)를 지정했다면, 그 개수만큼만 자릅니다.
    if (round && shuffledItems.length >= round) {
      shuffledItems = shuffledItems.slice(0, round);
    }

    // 조회수(플레이수) 1 증가
    await this.prisma.worldcup.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return {
      id: worldcup.id,
      title: worldcup.title,
      items: shuffledItems,
    };
  }

  async updateWinnerScore(itemId: number) {
    // 우승 횟수 winCount 1 증가시키고, 대결횟수 matchCount 도 1증가시킴
    return this.prisma.worldcupItem.update({
      where: { id: itemId },
      data: {
        winCount: { increment: 1 },
        matchCount: { increment: 1 },
      },
    });
  }
  // 5. 월드컵 전체 순위 통계 조회 (Read Rankings)
  // src/worldcup/worldcup.service.ts - getRankings 함수 교체

  async getRankings(worldcupId: number) {
    const worldcup = await this.prisma.worldcup.findUnique({
      where: { id: worldcupId },
      include: { items: true },
    });

    if (!worldcup) throw new NotFoundException('존재하지 않는 월드컵입니다.');

    // 💡 사용자가 갓 개설한 월드컵이라 views가 0일 경우, 나누기 에러를 막기 위해 분모를 1로 보정하거나 우승 횟수의 총합을 기준으로 삼습니다.
    const totalPlayCount = worldcup.views === 0 ? 1 : worldcup.views;

    const rankedItems = worldcup.items.map((item) => {
      // 1) 우승 확률 계산 (소수점 1자리까지 확보)
      const winRate = ((item.winCount / totalPlayCount) * 100).toFixed(1);

      // 2) 개별 대결 승률 계산 (판수가 0일 때 NaN 에러 방지)
      const matchWinRate =
        item.matchCount > 0
          ? ((item.winCount / item.matchCount) * 100).toFixed(1)
          : '0.0';

      return {
        ...item,
        winRate: parseFloat(winRate),
        matchWinRate: parseFloat(matchWinRate),
      };
    });

    // 우승 확률 높은 순 -> 대결 승률 높은 순으로 견고하게 정렬하여 리턴
    rankedItems.sort(
      (a, b) => b.winRate - a.winRate || b.matchWinRate - a.matchWinRate,
    );

    return {
      title: worldcup.title,
      totalPlays: worldcup.views,
      rankings: rankedItems,
    };
  }
  // 6. 댓글 등록 (Create Comment)
  async createComment(worldcupId: number, dto: any) {
    return this.prisma.worldcupComment.create({
      data: {
        worldcupId,
        nickname: dto.nickname,
        content: dto.content,
      },
    });
  }

  // 7. 특정 월드컵의 댓글 목록 최신순 조회 (Read Comments)
  async getComments(worldcupId: number) {
    return this.prisma.worldcupComment.findMany({
      where: { worldcupId },
      orderBy: { createdAt: 'desc' }, // 최신 댓글이 위로 오게 정렬
    });
  }
}
