"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimetagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_animetag_dto_1 = require("./create-animetag.dto");
class UpdateAnimetagDto extends (0, mapped_types_1.PartialType)(create_animetag_dto_1.CreateAnimetagDto) {
}
exports.UpdateAnimetagDto = UpdateAnimetagDto;
//# sourceMappingURL=update-animetag.dto.js.map