import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'host@demo.com' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '1234' })
  @IsString()
  @MinLength(6)
  password: string;
  @ApiProperty({ example: '유저1' })
  @IsString()
  @MinLength(2)
  name: string;
  @ApiProperty({ enum: ['ADMIN', 'USER'], default: 'USER' })
  @IsOptional()
  @IsIn(['ADMIN', 'USER'])
  role?: 'ADMIN' | 'USER';
}
