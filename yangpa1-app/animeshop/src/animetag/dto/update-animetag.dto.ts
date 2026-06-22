import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimetagDto } from './create-animetag.dto';

export class UpdateAnimetagDto extends PartialType(CreateAnimetagDto) {}
