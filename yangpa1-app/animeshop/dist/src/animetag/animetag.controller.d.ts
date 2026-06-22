import { AnimetagService } from './animetag.service';
import { CreateAnimetagDto } from './dto/create-animetag.dto';
import { UpdateAnimetagDto } from './dto/update-animetag.dto';
export declare class AnimetagController {
    private readonly animetagService;
    constructor(animetagService: AnimetagService);
    create(createAnimetagDto: CreateAnimetagDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAnimetagDto: UpdateAnimetagDto): string;
    remove(id: string): string;
}
