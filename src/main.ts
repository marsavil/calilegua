import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //evita campos extras en el Payload
      //forbidNonWhitelisted: true, // lanza error si existen datos prohibidos
      //disableErrorMessages: true, // deshabilita mensajes de error (producción)
    })
  )
  await app.listen(3000);
}
bootstrap();
