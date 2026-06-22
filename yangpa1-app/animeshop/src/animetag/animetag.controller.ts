import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnimetagService } from './animetag.service';
import { CreateAnimetagDto } from './dto/create-animetag.dto';
import { UpdateAnimetagDto } from './dto/update-animetag.dto';

@Controller('animetag')
export class AnimetagController {
  constructor(private readonly animetagService: AnimetagService) {}

  @Post()
  create(@Body() createAnimetagDto: CreateAnimetagDto) {
    return this.animetagService.create(createAnimetagDto);
  }

  @Get()
  findAll() {
    return this.animetagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animetagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimetagDto: UpdateAnimetagDto) {
    return this.animetagService.update(+id, updateAnimetagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animetagService.remove(+id);
  }
}
