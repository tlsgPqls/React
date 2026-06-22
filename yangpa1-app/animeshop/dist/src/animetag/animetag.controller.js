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
exports.AnimetagController = void 0;
const common_1 = require("@nestjs/common");
const animetag_service_1 = require("./animetag.service");
const create_animetag_dto_1 = require("./dto/create-animetag.dto");
const update_animetag_dto_1 = require("./dto/update-animetag.dto");
let AnimetagController = class AnimetagController {
    animetagService;
    constructor(animetagService) {
        this.animetagService = animetagService;
    }
    create(createAnimetagDto) {
        return this.animetagService.create(createAnimetagDto);
    }
    findAll() {
        return this.animetagService.findAll();
    }
    findOne(id) {
        return this.animetagService.findOne(+id);
    }
    update(id, updateAnimetagDto) {
        return this.animetagService.update(+id, updateAnimetagDto);
    }
    remove(id) {
        return this.animetagService.remove(+id);
    }
};
exports.AnimetagController = AnimetagController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_animetag_dto_1.CreateAnimetagDto]),
    __metadata("design:returntype", void 0)
], AnimetagController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnimetagController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimetagController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_animetag_dto_1.UpdateAnimetagDto]),
    __metadata("design:returntype", void 0)
], AnimetagController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnimetagController.prototype, "remove", null);
exports.AnimetagController = AnimetagController = __decorate([
    (0, common_1.Controller)('animetag'),
    __metadata("design:paramtypes", [animetag_service_1.AnimetagService])
], AnimetagController);
//# sourceMappingURL=animetag.controller.js.map