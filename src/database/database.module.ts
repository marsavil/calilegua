import { Global, Module } from '@nestjs/common';
import { Client } from 'pg';
import config from '../config';
import { ConfigType } from '@nestjs/config';


const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';
const client = new Client({  
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});
client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'PG', 
      useFactory: (configService: ConfigType<typeof config>) => { 
        const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          database: dbName,
          password,
          port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  
  ],
  exports: ['APIKEY', 'PG'],
})
export class DatabaseModule {}

