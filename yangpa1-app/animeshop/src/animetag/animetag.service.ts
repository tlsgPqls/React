import { Injectable } from '@nestjs/common';
import { CreateAnimetagDto } from './dto/create-animetag.dto';
import { UpdateAnimetagDto } from './dto/update-animetag.dto';

@Injectable()
export class AnimetagService {
  create(createAnimetagDto: CreateAnimetagDto) {
    return 'This action adds a new animetag';
  }

  findAll() {
    return `This action returns all animetag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animetag`;
  }

  update(id: number, updateAnimetagDto: UpdateAnimetagDto) {
    return `This action updates a #${id} animetag`;
  }

  remove(id: number) {
    return `This action removes a #${id} animetag`;
  }
}
