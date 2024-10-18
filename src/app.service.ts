import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';


@Injectable()
export class AppService {
  constructor(
    //private config: ConfigService,
    @Inject('APIKEY') private apiKey: string,
    @Inject('TAREA ASINC') private tarea: string,
    @Inject('APIKEY') private Key: string,
    @Inject(config.KEY) private configServ: ConfigType<typeof config>
  ) {}

  getHello(): string {
    return 'Hola mundirijillo!';
  }
  getApiKey(): string {
    const key = this.Key
    return `La llave de la aplicación es : ${key}`;
  }
  getTarea(): string {
    const tareaAsinc = this.tarea;
    const string = JSON.stringify(tareaAsinc);
    return `Esta es la tarea asíncrona  : ${string}`;
  }
  getEnvs(): string {
    const apiKey = this.configServ.apiKey;
    const name = this.configServ.database.name;
    const dbPort = this.configServ.database.port
    return `Envs: La llave de la aplicación es: ${apiKey} y el nombre de la base de datos es: ${name}. El puerto de la base de datos es : ${dbPort}`;
  }  
}
