import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const exists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
      include: {
        profileImage: true,
      },
    });
    if (exists) throw new ConflictException(`이미 가입된 이메일 입니다.`);
    // 회원가입
    const user = await this.prisma.user.create({ data: createUserDto });
    if (!user) throw new Error();
    // 이미지 넣는거죠
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

  async addProfileImage(userId: number, file: Express.Multer.File) {
    // 1. 유저 존재 검사
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) throw new NotFoundException(`존재하지 않는 유저입니다.`);

    // 2. 저장할 이미지 URL 주소 생성
    const profileImageUrl = `http://localhost:3001/uploads/${file.filename}`;

    // 3. 💡 [필수] ProfileImage DB 테이블에 기존 기록이 있는지 확인
    const existingImage = await this.prisma.profileImage.findFirst({
      where: { userId: userId },
    });

    let savedImage;

    if (existingImage) {
      // 💡 A. 이미 프로필 사진 기록이 있다면 새 사진으로 업데이트(Update)
      savedImage = await this.prisma.profileImage.update({
        where: { id: existingImage.id },
        data: {
          storedName: file.filename,
          url: profileImageUrl,
        },
      });
    } else {
      // 💡 B. 처음 프로필 사진을 등록하는 유저라면 새로 생성(Create)
      savedImage = await this.prisma.profileImage.create({
        data: {
          userId: userId,
          storedName: file.filename,
          url: profileImageUrl,
        },
      });
    }

    // 4. 💡 [필수] 프론트엔드가 에러 없이 받아먹을 수 있도록 JSON 형태로 데이터 리턴!
    return { url: savedImage.url };
  }

  findAll() {
    return this.prisma.user.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profileImage: true,
      },
    });
    if (!user)
      throw new NotFoundException(`사용자 아이디 ${id} 를 찾을 수 없습니다`);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    const exists = await this.prisma.user.findUnique({
      where: { email: updateUserDto.email },
    });
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleted = await this.prisma.user.delete({ where: { id } });
    return { deleted: deleted };
  }
  //회원가입 시 사용 목적
  async createUser(data: {
    email: string;
    name: string;
    password: string;
    role: Role;
  }) {
    return this.prisma.user.create({ data });
  }
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profileImage: true },
    });
  }
}
