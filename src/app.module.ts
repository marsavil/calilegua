import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './config'
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperadoresModule } from './operadores/operadores.module';
import { ProductosModule } from './productos/productos.module';
import { lastValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { environments } from './environments'; // importación de la definición de entornos
import * as Joi from 'joi';
import { Client } from 'pg';



const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';
// const client = new Client({  
//   user: 'root',
//   host: 'localhost',
//   database: 'my_db',
//   password: '123456',
//   port: 5432,
// });
// client.connect();
// client.query('SELECT * FROM tareas', (err, res) => {
//   console.error(err);
//   console.log('Filas en BD', res.rows);
//   console.log('Conección a la BD establecida')
// });


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
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
  
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'TAREA ASINC',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/posts');
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
