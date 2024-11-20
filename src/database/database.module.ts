import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoClient } from 'mongodb';


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

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject:[config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        //const { user, host, dbName, password, port } = configService.mysql;
        return {
          type: 'postgres',
          //type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false, 
          autoLoadEntities: true,
        };
      }
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } = configService.mongo
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        console.log ('Conection to Mongo established')
        const database = client.db(dbName)
        return database; 
      },
      inject:[config.KEY],
        // provide: 'APIKEY',
        // useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,

    },
    // {
    //   provide: 'PG', 
    //   useFactory: (configService: ConfigType<typeof config>) => { 
    //     const { user, host, dbName, password, port } = configService.postgres;
    //     const client = new Client({
    //       user,
    //       host,
    //       database: dbName,
    //       password,
    //       port,
    //     });
    //     client.connect();
    //     return client;
    //   },
    //   inject: [config.KEY],
    // },
  
  ],
 exports: ['MONGO'],
})
export class DatabaseModule {}

