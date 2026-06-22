import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { type AuthUser, CurrentUser } from '../common/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { imageUploadOptions } from '../common/upload.config';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '이미지와 데이터를 함께 업로드합니다.',
    type: CreateUserDto, // 💡 만든 DTO를 타입으로 지정
  })
  @UseInterceptors(FileInterceptor('image', imageUploadOptions))
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, file);
  }
  @Get('me') // 👈 http://localhost:3000/user/me 주소가 됩니다.
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getMyProfile(@CurrentUser() user: AuthUser) {
    // 토큰에서 추출한 내 유저 정보(user)를 프론트엔드가 원하는 { data: ... } 형태로 리턴합니다.
    return {
      data: user,
    };
  }
  // 2단계: 내 프로필 이미지 등록 및 변경 (분리형 API)
  @Post('profile/image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        // 👈 프론트엔드가 FormData에 담아 보낼 key 이름
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', imageUploadOptions)) // 정의해 두신 옵션 사용
  uploadProfileImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: AuthUser, // 👈 로그인한 내 정보를 토큰에서 추출
  ) {
    if (!file) {
      throw new UnsupportedMediaTypeException(
        `업로드할 프로필 이미지가 없습니다.`,
      );
    }

    // 내 userId와 파일 정보를 서비스단으로 넘겨 DB에 매칭합니다.
    return this.userService.addProfileImage(user.id, file);
  }

  @Get()
  @ApiOperation({ summary: '유저 목록' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
