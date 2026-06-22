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
const prisma_service_1 = require("./prisma/prisma.service");
let WorldcupService = class WorldcupService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getGameItems(worldcupId) {
        const worldcup = await this.prisma.worldcup.findUnique({
            where: { id: worldcupId },
            include: { items: true },
        });
        if (!worldcup)
            throw new common_1.NotFoundException('존재하지 않는 월드컵입니다.');
        const shuffledItems = worldcup.items.sort(() => Math.random() - 0.5);
        return {
            title: worldcup.title,
            items: shuffledItems,
        };
    }
};
exports.WorldcupService = WorldcupService;
exports.WorldcupService = WorldcupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorldcupService);
//# sourceMappingURL=worldcup.service.js.map