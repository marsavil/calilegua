import { Global, Module } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (ConfigService: ConfigType<typeof config>) => {
        //const { connection, user, password, host, port, dbName, message } = ConfigService.mongo;
        const {  user, password, dbName, atlas, message } = ConfigService.atlas;
        console.log(`${message}`)
        const mongoose = require('mongoose');
        mongoose.Schema.Types.ObjectId.get(function () {
          return this.toString();
        });

        // Conexión Docker
        // return{
        //   uri: `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`,
        //   user,
        //   pass: password,
        //   dbName
        // }

        // Conexión Mongo atlas
        return {
          uri: atlas,
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

