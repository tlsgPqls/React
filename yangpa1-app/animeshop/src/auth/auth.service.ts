import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) throw new ConflictException(`이미 가입된 이메일 입니다`);
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.userService.createUser({
      email: dto.email,
      name: dto.name,
      password: hashed,
      role: dto.role ?? 'USER',
    });
    const { password, ...result } = user; // 비밀번호 빼고 나머지 데이터 반환
    return result;
  }
  async login(dto: LoginDto) {
    // 1) 이메일로 회원이 있는지 검사
    const user = await this.userService.findByEmail(dto.email);
    // 2) 회원이 있으면 평문암호와 DB 에 저장된 해시 비교 bcrypt.compare
    if (!user) {
      throw new UnauthorizedException(`회원 없음: 비밀번호 암호가 틀려요`);
    }
    const isRight = await bcrypt.compare(dto.password, user.password);

    if (!isRight) {
      throw new UnauthorizedException(`이메일 또는 비번이 틀립니다.`);
    }

    // if (!user || !isRight) {
    //   throw new UnauthorizedException(`이메일 또는 비번이 틀립니다.`);
    // }
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      message: '로그인 이 완료되었습니다.',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        profileImage: user['profileImage'], // 아래 2번 조치를 취하면 여기에 사진 데이터가 실려옵니다.
      },
    };
  }
}
