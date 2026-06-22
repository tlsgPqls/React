import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class WorldcupService {
  constructor(private prisma: PrismaService) {}

  // 특정 월드컵의 후보 목록을 랜덤으로 가져오기
  async getGameItems(worldcupId: number) {
    const worldcup = await this.prisma.worldcup.findUnique({
      where: { id: worldcupId },
      include: { items: true },
    });

    if (!worldcup) throw new NotFoundException('존재하지 않는 월드컵입니다.');

    // 💡 핵심: 후보 리스트를 무작위로 섞어서 리턴 (피셔-예이츠 셔플 알고리즘)
    const shuffledItems = worldcup.items.sort(() => Math.random() - 0.5);

    return {
      title: worldcup.title,
      items: shuffledItems,
    };
  }
}
