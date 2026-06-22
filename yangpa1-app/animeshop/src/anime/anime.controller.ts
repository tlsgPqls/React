import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { CurrentUser } from '../common/current-user.decorator';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get('recommend')
  async getRecommended(@CurrentUser() user: any) {
    let target = '액션';
    if (user && user.role === 'ADMIN') {
      target = '명작';
    }
    return this.animeService.getRecommendedAnime(target);
  }
  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animeService.create(createAnimeDto);
  }

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animeService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animeService.remove(+id);
  }
}
