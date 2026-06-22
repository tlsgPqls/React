// src/worldcup/dto/create-worldcup.dto.ts

import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateWorldcupItemDto {
  @IsString() // 👈 필수 추가
  name: string;

  @IsString() // 👈 필수 추가
  imageUrl: string;
}

export class CreateWorldcupDto {
  @IsString() // 👈 필수 추가
  title: string;

  @IsString()
  @IsOptional() // 👈 선택적 필드 처리
  desc?: string;

  @IsArray() // 👈 배열 검증 추가
  @ValidateNested({ each: true }) // 👈 자식 객체(Item) 내부 검증 활성화
  @Type(() => CreateWorldcupItemDto) // 👈 class-transformer 타입 지정
  items: CreateWorldcupItemDto[];
}
