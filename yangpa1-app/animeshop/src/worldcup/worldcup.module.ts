import { Module } from '@nestjs/common';
import { WorldcupController } from './worldcup.controller';
import { WorldcupService } from './worldcup.service';

@Module({
  controllers: [WorldcupController],
  providers: [WorldcupService]
})
export class WorldcupModule {}
