import { AnimeService } from './anime.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
export declare class AnimeController {
    private readonly animeService;
    constructor(animeService: AnimeService);
    getRecommended(user: any): Promise<{
        tag: string;
        list: {
            description: string;
            title: string;
            id: number;
            posterImage: string | null;
        }[];
    }>;
    create(createAnimeDto: CreateAnimeDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            description: string;
            title: string;
            id: number;
            posterImage: string | null;
        };
    }>;
    update(id: string, updateAnimeDto: UpdateAnimeDto): string;
    remove(id: string): string;
}
