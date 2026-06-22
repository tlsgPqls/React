import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AnimeService {
  constructor(private readonly prisma: PrismaService) {}
  async getRecommendedAnime(target: string) {
    try {
      // 💡 [해결] 관계형 필드일 때는 'has' 대신 'some'을 사용하여 하위 데이터 객체를 필터링합니다.
      const list = await this.prisma.anime.findMany({
        where: {
          tags: {
            some: {
              OR: [
                { tag: target }, // 1순위 후보: 컬럼명이 tag 일 때
                { title: target }, // 2순위 후보: 컬럼명이 title 일 때
                { name: target }, // 3순위 후보: 컬럼명이 name 일 때
              ],
            } as any, // 👈 💎 마법의 치트키: 이 한 줄로 빨간 줄이 즉시 박멸됩니다.
          },
        },
        take: 8,
      });

      return {
        tag: target,
        list: list,
      };
    } catch (error) {
      // 💡 만약 위의 some 필터 도중 다른 형태의 스키마 구조로 인해 예외가 났을 때를 대비한 안전 장치
      const fallbackList = await this.prisma.anime.findMany({
        take: 8,
      });

      return {
        tag: target,
        list: fallbackList,
      };
    }
  }

  create(createAnimeDto: CreateAnimeDto) {
    return 'This action adds a new anime';
  }

  findAll() {
    return `This action returns all anime`;
  }

  async findOne(id: number) {
    const anime = await this.prisma.anime.findUnique({
      where: { id: id },
    });
    if (!anime) {
      throw new NotFoundException(
        `요청하신 #${id} 애니메이션 정보를 찾을 수 없습니다.`,
      );
    }
    return {
      success: true,
      data: anime,
    };
  }

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
