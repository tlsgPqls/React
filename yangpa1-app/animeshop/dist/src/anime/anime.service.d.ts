import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AnimeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getRecommendedAnime(target: string): Promise<{
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
    findOne(id: number): Promise<{
        success: boolean;
        data: {
            description: string;
            title: string;
            id: number;
            posterImage: string | null;
        };
    }>;
    update(id: number, updateAnimeDto: UpdateAnimeDto): string;
    remove(id: number): string;
}
