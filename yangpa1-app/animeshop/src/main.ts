import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    origin: true, // 모든 도메인에서의 접근을 허용하거나 혹은 'http://localhost:3001' 등 지정 가능
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('애니대백과 API (Relation 추가)')
    .setDescription('서브 메모')
    .setVersion('1.0')
    .addBearerAuth() // 보호 라우트용 테스트 토큰 입력
    .build();

  SwaggerModule.setup('docs', app, SwaggerModule.createDocument(app, config));
  console.log(
    `prisma 애니대백과 데이터 수집 시작: http://localhost:${process.env.PORT}(Swagger 문서:/docs)`,
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
