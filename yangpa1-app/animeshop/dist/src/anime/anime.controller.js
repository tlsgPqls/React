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
exports.AnimeController = void 0;
const common_1 = require("@nestjs/common");
const anime_service_1 = require("./anime.service");
const create_anime_dto_1 = require("./dto/create-anime.dto");
const update_anime_dto_1 = require("./dto/update-anime.dto");
const current_user_decorator_1 = require("../common/current-user.decorator");
let AnimeController = class AnimeController {
    animeService;
    constructor(animeService) {
        this.animeService = animeService;
    }
    async getRecommended(user) {
        let target = '액션';
        if (user && user.role === 'ADMIN') {
            target = '명작';
        }
        return this.animeService.getRecommendedAnime(target);
    }
    create(createAnimeDto) {
        return this.animeService.create(createAnimeDto);
    }
    findAll() {
        return this.animeService.findAll();
    }
    findOne(id) {
        return this.animeService.findOne(+id);
    }
    update(id, updateAnimeDto) {
        return this.animeService.update(+id, updateAnimeDto);
    }
    remove(id) {
        return this.animeService.remove(+id);
    }
};
exports.AnimeController = AnimeController;
__decorate([
    (0, common_1.Get)('recommend'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnimeController.prototype, "getRecommended", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_anime_dto_1.CreateAnimeDto]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_anime_dto_1.UpdateAnimeDto]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimeController.prototype, "remove", null);
exports.AnimeController = AnimeController = __decorate([
    (0, common_1.Controller)('anime'),
    __metadata("design:paramtypes", [anime_service_1.AnimeService])
], AnimeController);
//# sourceMappingURL=anime.controller.js.map