import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitializeFirebaseApp } from 'firebase.config';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

InitializeFirebaseApp();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe(),
  );
  await app.listen(3002);
}
bootstrap();
