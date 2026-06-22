import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AnimeModule } from './anime/anime.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { AnimetagModule } from './animetag/animetag.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UPLOAD_DIR } from './common/upload.config';
import { WorldcupModule } from './worldcup/worldcup.module';

@Module({
  imports: [
    UserModule,
    AnimeModule,
    LikeModule,
    CommentModule,
    TagModule,
    AnimetagModule,
    PrismaModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), UPLOAD_DIR), //.../shop/uploads
      serveRoot: '/uploads',
    }),
    WorldcupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
