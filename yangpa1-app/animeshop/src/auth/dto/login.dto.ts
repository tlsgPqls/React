import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, isString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'User@example.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '1234' })
  @IsString()
  password: string;
}
