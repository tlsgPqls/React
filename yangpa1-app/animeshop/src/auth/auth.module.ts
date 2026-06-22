import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtContants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // login 에서  sign() jwt token 만들기 위한 시크릿 정보
      secret: jwtContants.secret,
      // 토큰 유효기간
      // access_token 짧게(1시간), refresh_token 길게 (14d)
      signOptions: { expiresIn: '14d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
