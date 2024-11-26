import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config'
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments'; // importación de la definición de entornos
import * as Joi from 'joi';



@Module({
  imports: [
    HttpModule,
    OperadoresModule,
    ProductosModule,
    DatabaseModule,
    ConfigModule.forRoot({  // Implementación
      envFilePath: environments[process.env.NODE_ENV] || '.env',  // selección dinámica de los entornos de ejecución
      load: [config], // lectura del archivo de tipado de las variables
      isGlobal: true,
      validationSchema: Joi.object()
  
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}