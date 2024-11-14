import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('e-commerce-API')
    .setDescription('Documentación para la API del e-commerce')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //evita campos extras en el Payload
      forbidNonWhitelisted: true, // lanza error si existen datos prohibidos
      //disableErrorMessages: true, // deshabilita mensajes de error (producción)
      transformOptions: {
        enableImplicitConversion: true, // convierte si existe una cadena de caracteres numericos
      }
    })
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector))); // permite serializar los objetos de respuesta

  SwaggerModule.setup('info', app, document);
  await app.listen(3000);
}
bootstrap();
