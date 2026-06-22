import { CreateAnimetagDto } from './dto/create-animetag.dto';
import { UpdateAnimetagDto } from './dto/update-animetag.dto';
export declare class AnimetagService {
    create(createAnimetagDto: CreateAnimetagDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAnimetagDto: UpdateAnimetagDto): string;
    remove(id: number): string;
}
