"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldcupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let WorldcupService = class WorldcupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.worldcup.create({
            data: {
                title: dto.title,
                desc: dto.desc,
                items: {
                    create: dto.items,
                },
            },
            include: {
                items: true,
            },
        });
    }
    async findAll() {
        return this.prisma.worldcup.findMany({
            select: {
                id: true,
                title: true,
                desc: true,
                views: true,
                createdAt: true,
                _count: {
                    select: { items: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getGameItems(id, round) {
        const worldcup = await this.prisma.worldcup.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!worldcup) {
            throw new common_1.NotFoundException('존재하지 않는 월드컵 게임입니다.');
        }
        let shuffledItems = worldcup.items.sort(() => Math.random() - 0.5);
        if (round && shuffledItems.length >= round) {
            shuffledItems = shuffledItems.slice(0, round);
        }
        await this.prisma.worldcup.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        return {
            id: worldcup.id,
            title: worldcup.title,
            items: shuffledItems,
        };
    }
    async updateWinnerScore(itemId) {
        return this.prisma.worldcupItem.update({
            where: { id: itemId },
            data: {
                winCount: { increment: 1 },
                matchCount: { increment: 1 },
            },
        });
    }
    async getRankings(worldcupId) {
        const worldcup = await this.prisma.worldcup.findUnique({
            where: { id: worldcupId },
            include: { items: true },
        });
        if (!worldcup)
            throw new common_1.NotFoundException('존재하지 않는 월드컵입니다.');
        const totalPlayCount = worldcup.views === 0 ? 1 : worldcup.views;
        const rankedItems = worldcup.items.map((item) => {
            const winRate = ((item.winCount / totalPlayCount) * 100).toFixed(1);
            const matchWinRate = item.matchCount > 0
                ? ((item.winCount / item.matchCount) * 100).toFixed(1)
                : '0.0';
            return {
                ...item,
                winRate: parseFloat(winRate),
                matchWinRate: parseFloat(matchWinRate),
            };
        });
        rankedItems.sort((a, b) => b.winRate - a.winRate || b.matchWinRate - a.matchWinRate);
        return {
            title: worldcup.title,
            totalPlays: worldcup.views,
            rankings: rankedItems,
        };
    }
    async createComment(worldcupId, dto) {
        return this.prisma.worldcupComment.create({
            data: {
                worldcupId,
                nickname: dto.nickname,
                content: dto.content,
            },
        });
    }
    async getComments(worldcupId) {
        return this.prisma.worldcupComment.findMany({
            where: { worldcupId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.WorldcupService = WorldcupService;
exports.WorldcupService = WorldcupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorldcupService);
//# sourceMappingURL=worldcup.service.js.map