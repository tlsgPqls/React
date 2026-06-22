import { PrismaService } from './prisma/prisma.service';
export declare class WorldcupService {
    private prisma;
    constructor(prisma: PrismaService);
    getGameItems(worldcupId: number): Promise<{
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
}
