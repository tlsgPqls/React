import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  nickname: string;

  @IsString()
  content: string;
}
