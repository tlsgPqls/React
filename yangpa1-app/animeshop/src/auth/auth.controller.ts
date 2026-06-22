import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  @ApiOperation({ summary: '회원가입' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @Post('logout')
  @ApiOperation({ summary: '로그아웃' })
  logout() {
    // JWT 기반은 프론트에서 토큰을 삭제하는 것이 핵심이므로,
    // 백엔드는 성공 메시지나 쿠키 만료(쿠키 사용 시) 처리를 반환합니다.
    return {
      success: true,
      message: '로그아웃이 완료되었습니다.',
    };
  }
  @UseGuards(JwtAuthGuard) // JWT 토큰 인증 가드
  @Get('me')
  async getProfile(@Request() req) {
    // 토큰 검증이 완료되면 req.user에 유저 정보가 들어옵니다.
    // 프론트엔드 헤더 요구사항에 맞춰 { data: ... } 형태로 리턴합니다.
    const userId = req.user.id;
    const fullUserInfo = await this.userService.findOne(userId);
    console.log('--------------------------------------------------');
    console.log('[Me API 호출 성공] 요청 유저 ID:', userId);
    console.log(
      '[DB에서 꺼내온 사진 객체 상태]:',
      fullUserInfo['profileImage'],
    );
    console.log('--------------------------------------------------');

    return {
      success: true,
      data: fullUserInfo,
    };
  }
}
