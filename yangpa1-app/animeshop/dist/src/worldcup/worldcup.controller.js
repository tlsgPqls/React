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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldcupController = void 0;
const common_1 = require("@nestjs/common");
const worldcup_service_1 = require("./worldcup.service");
const create_worldcup_dto_1 = require("./dto/create-worldcup.dto");
let WorldcupController = class WorldcupController {
    worldcupService;
    constructor(worldcupService) {
        this.worldcupService = worldcupService;
    }
    createWorldcup(dto) {
        return this.worldcupService.create(dto);
    }
    addComment(id, dto) {
        return this.worldcupService.createComment(id, dto);
    }
    getAllWorldcups() {
        return this.worldcupService.findAll();
    }
    getComments(id) {
        return this.worldcupService.getComments(id);
    }
    getGameItems(id, round) {
        const roundNum = round ? parseInt(round, 10) : undefined;
        return this.worldcupService.getGameItems(id, roundNum);
    }
    async winWorldcupItem(id) {
        return this.worldcupService.updateWinnerScore(id);
    }
    getStats(id) {
        return this.worldcupService.getRankings(id);
    }
};
exports.WorldcupController = WorldcupController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_worldcup_dto_1.CreateWorldcupDto]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "createWorldcup", null);
__decorate([
    (0, common_1.Post)(':id/comments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "addComment", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "getAllWorldcups", null);
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "getComments", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('round')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "getGameItems", null);
__decorate([
    (0, common_1.Patch)('item/:id/win'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorldcupController.prototype, "winWorldcupItem", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], WorldcupController.prototype, "getStats", null);
exports.WorldcupController = WorldcupController = __decorate([
    (0, common_1.Controller)('worldcup'),
    __metadata("design:paramtypes", [worldcup_service_1.WorldcupService])
], WorldcupController);
//# sourceMappingURL=worldcup.controller.js.map