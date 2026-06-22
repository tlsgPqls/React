import { PrismaService } from '../prisma/prisma.service';
import { CreateWorldcupDto } from './dto/create-worldcup.dto';
export declare class WorldcupService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorldcupDto): Promise<{
        items: {
            name: string;
            id: number;
            imageUrl: string;
            winCount: number;
            matchCount: number;
            worldcupId: number;
        }[];
    } & {
        views: number;
        title: string;
        id: number;
        desc: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        views: number;
        title: string;
        id: number;
        _count: {
            items: number;
        };
        desc: string | null;
        createdAt: Date;
    }[]>;
    getGameItems(id: number, round?: number): Promise<{
        id: number;
        title: string;
        items: {
            name: string;
            id: number;
            imageUrl: string;
            winCount: number;
            matchCount: number;
            worldcupId: number;
        }[];
    }>;
    updateWinnerScore(itemId: number): Promise<{
        name: string;
        id: number;
        imageUrl: string;
        winCount: number;
        matchCount: number;
        worldcupId: number;
    }>;
    getRankings(worldcupId: number): Promise<{
        title: string;
        totalPlays: number;
        rankings: {
            winRate: number;
            matchWinRate: number;
            name: string;
            id: number;
            imageUrl: string;
            winCount: number;
            matchCount: number;
            worldcupId: number;
        }[];
    }>;
    createComment(worldcupId: number, dto: any): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        worldcupId: number;
        nickname: string;
    }>;
    getComments(worldcupId: number): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        worldcupId: number;
        nickname: string;
    }[]>;
}
