import { Global, Module } from '@nestjs/common';
import config from '../config';
import { ConfigService, ConfigType } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';


// const APIKEY = 'DEV-456';
// const APIKEYPROD = 'PROD-12345';
// const client = new Client({
//   user: 'root',
//   host: 'localhost',
//   database: 'my_db',
//   password: '123456',
//   port: 5432,
// });
// client.connect();

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = ConfigService.mongo;
        console.log('Connection established to mongo through mongoose')

        // Configuración global de Mongoose para convertir ObjectId en cadenas
        const mongoose = require('mongoose');
        mongoose.Schema.Types.ObjectId.get(function () {
          return this.toString();
        });

        return{
          uri: `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`,
          user,
          pass: password,
          dbName

        }
      },
      inject:[config.KEY],
    })
  ],
  providers: [],
 exports: [MongooseModule],
})
export class DatabaseModule {}

