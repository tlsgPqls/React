import { Module } from '@nestjs/common';
import { AnimetagService } from './animetag.service';
import { AnimetagController } from './animetag.controller';

@Module({
  controllers: [AnimetagController],
  providers: [AnimetagService],
})
export class AnimetagModule {}
