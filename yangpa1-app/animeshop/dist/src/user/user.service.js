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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto, file) {
        const exists = await this.prisma.user.findUnique({
            where: { email: createUserDto.email },
            include: {
                profileImage: true,
            },
        });
        if (exists)
            throw new common_1.ConflictException(`이미 가입된 이메일 입니다.`);
        const user = await this.prisma.user.create({ data: createUserDto });
        if (!user)
            throw new Error();
        const profileImageUrl = `http://localhost:3001/uploads/${file.filename}`;
        await this.prisma.profileImage.create({
            data: {
                userId: user.id,
                storedName: file.filename,
                url: profileImageUrl,
            },
        });
        return this.prisma.user.create({ data: createUserDto });
    }
    async addProfileImage(userId, file) {
        const userExists = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!userExists)
            throw new common_1.NotFoundException(`존재하지 않는 유저입니다.`);
        const profileImageUrl = `http://localhost:3001/uploads/${file.filename}`;
        const existingImage = await this.prisma.profileImage.findFirst({
            where: { userId: userId },
        });
        let savedImage;
        if (existingImage) {
            savedImage = await this.prisma.profileImage.update({
                where: { id: existingImage.id },
                data: {
                    storedName: file.filename,
                    url: profileImageUrl,
                },
            });
        }
        else {
            savedImage = await this.prisma.profileImage.create({
                data: {
                    userId: userId,
                    storedName: file.filename,
                    url: profileImageUrl,
                },
            });
        }
        return { url: savedImage.url };
    }
    findAll() {
        return this.prisma.user.findMany({
            orderBy: { id: 'asc' },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                profileImage: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException(`사용자 아이디 ${id} 를 찾을 수 없습니다`);
        return user;
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        const exists = await this.prisma.user.findUnique({
            where: { email: updateUserDto.email },
        });
        return this.prisma.user.update({ where: { id }, data: updateUserDto });
    }
    async remove(id) {
        await this.findOne(id);
        const deleted = await this.prisma.user.delete({ where: { id } });
        return { deleted: deleted };
    }
    async createUser(data) {
        return this.prisma.user.create({ data });
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            include: { profileImage: true },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map