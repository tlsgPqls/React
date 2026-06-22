"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageUploadOptions = exports.MAX_FILE_SIZE = exports.UPLOAD_DIR = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
exports.UPLOAD_DIR = 'uploads';
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
exports.MAX_FILE_SIZE = 5 * 1024 * 1024;
exports.imageUploadOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: exports.UPLOAD_DIR,
        filename: (_req, file, callback) => {
            const unique = (0, crypto_1.randomUUID)();
            const ext = (0, path_1.extname)(file.originalname).toLocaleLowerCase();
            callback(null, `${unique}${ext}`);
        },
    }),
    fileFilter: (_req, file, callback) => {
        if (!ALLOWED_MIME.includes(file.mimetype)) {
            callback(new common_1.BadRequestException(`이미지 파일만 올 수 있어요!`), false);
            return;
        }
        callback(null, true);
    },
    limit: { fileSize: exports.MAX_FILE_SIZE },
};
//# sourceMappingURL=upload.config.js.map