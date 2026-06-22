import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    example: 'User@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: '행복한 유저',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '업로드할 이미지 파일',
  })
  image: any;
}
