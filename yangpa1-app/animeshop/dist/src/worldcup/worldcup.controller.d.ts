import { WorldcupService } from './worldcup.service';
import { CreateWorldcupDto } from './dto/create-worldcup.dto';
export declare class WorldcupController {
    private readonly worldcupService;
    constructor(worldcupService: WorldcupService);
    createWorldcup(dto: CreateWorldcupDto): Promise<{
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
    addComment(id: number, dto: any): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        worldcupId: number;
        nickname: string;
    }>;
    getAllWorldcups(): Promise<{
        views: number;
        title: string;
        id: number;
        _count: {
            items: number;
        };
        desc: string | null;
        createdAt: Date;
    }[]>;
    getComments(id: number): Promise<{
        id: number;
        content: string;
        createdAt: Date;
        worldcupId: number;
        nickname: string;
    }[]>;
    getGameItems(id: number, round?: string): Promise<{
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
    winWorldcupItem(id: number): Promise<{
        name: string;
        id: number;
        imageUrl: string;
        winCount: number;
        matchCount: number;
        worldcupId: number;
    }>;
    getStats(id: number): Promise<{
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
}
