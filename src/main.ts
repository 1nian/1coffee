import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      // dto + ValidationPipe 只接收需要的字段
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(1128);
}
bootstrap();
