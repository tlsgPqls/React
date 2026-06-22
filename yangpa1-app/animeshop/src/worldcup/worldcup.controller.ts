// src/worldcup/worldcup.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { WorldcupService } from './worldcup.service';
import { CreateWorldcupDto } from './dto/create-worldcup.dto';

@Controller('worldcup') // 👈 http://localhost:3000/worldcup 주소 매핑
export class WorldcupController {
  constructor(private readonly worldcupService: WorldcupService) {}

  // 1. 새로운 월드컵 개설 API
  // POST http://localhost:3000/worldcup
  @Post()
  createWorldcup(@Body() dto: CreateWorldcupDto) {
    return this.worldcupService.create(dto);
  }
  // 1) 댓글 등록: POST http://localhost:3001/worldcup/:id/comments
  @Post(':id/comments')
  addComment(@Param('id', ParseIntPipe) id: number, @Body() dto: any) {
    return this.worldcupService.createComment(id, dto);
  }
  // 2. 전체 월드컵 목록 조회 API (대문 화면용)
  // GET http://localhost:3000/worldcup
  @Get()
  getAllWorldcups() {
    return this.worldcupService.findAll();
  }
  // 2) 댓글 조회: GET http://localhost:3001/worldcup/:id/comments
  @Get(':id/comments')
  getComments(@Param('id', ParseIntPipe) id: number) {
    return this.worldcupService.getComments(id);
  }
  // 3. 특정 월드컵 아이템 랜덤 조회 API (게임 시작용)
  // GET http://localhost:3000/worldcup/:id
  @Get(':id')
  getGameItems(
    @Param('id', ParseIntPipe) id: number,
    @Query('round') round?: string, // 👈 쿼리 파라미터 추가 수신
  ) {
    const roundNum = round ? parseInt(round, 10) : undefined;
    return this.worldcupService.getGameItems(id, roundNum);
  }

  @Patch('item/:id/win')
  async winWorldcupItem(@Param('id', ParseIntPipe) id: number) {
    return this.worldcupService.updateWinnerScore(id);
  }
  // GET http://localhost:4000/worldcup/:id/stats
  @Get(':id/stats')
  getStats(@Param('id', ParseIntPipe) id: number) {
    return this.worldcupService.getRankings(id);
  }
}
