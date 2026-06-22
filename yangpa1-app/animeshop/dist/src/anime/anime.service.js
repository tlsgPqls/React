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
exports.AnimeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnimeService = class AnimeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRecommendedAnime(target) {
        try {
            const list = await this.prisma.anime.findMany({
                where: {
                    tags: {
                        some: {
                            OR: [
                                { tag: target },
                                { title: target },
                                { name: target },
                            ],
                        },
                    },
                },
                take: 8,
            });
            return {
                tag: target,
                list: list,
            };
        }
        catch (error) {
            const fallbackList = await this.prisma.anime.findMany({
                take: 8,
            });
            return {
                tag: target,
                list: fallbackList,
            };
        }
    }
    create(createAnimeDto) {
        return 'This action adds a new anime';
    }
    findAll() {
        return `This action returns all anime`;
    }
    async findOne(id) {
        const anime = await this.prisma.anime.findUnique({
            where: { id: id },
        });
        if (!anime) {
            throw new common_1.NotFoundException(`요청하신 #${id} 애니메이션 정보를 찾을 수 없습니다.`);
        }
        return {
            success: true,
            data: anime,
        };
    }
    update(id, updateAnimeDto) {
        return `This action updates a #${id} anime`;
    }
    remove(id) {
        return `This action removes a #${id} anime`;
    }
};
exports.AnimeService = AnimeService;
exports.AnimeService = AnimeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnimeService);
//# sourceMappingURL=anime.service.js.map