import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  //app.setGlobalPrefix(CurrentAppVersion);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use('/uploads', express.static(join(__dirname, '../', 'uploads')));
  app.use('/assets', express.static(join(__dirname, '../', 'assets')));
  await app.listen(3008);
  console.log('App running successfully', await app.getUrl());
}
bootstrap();
