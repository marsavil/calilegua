import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  //constructor(@Inject('APIKEY') private apiKey: string) {}
  constructor(@Inject('TAREA ASINC') private tarea: string) {}
  getHello(): string {
    return 'Hola mundirijillo!';
  }
  // getApiKey(): string {
  //   const key = this.apiKey
  //   return `La llave de la aplicación es : ${key}`;
  // }
  getTarea(): string {
    const tareaAsinc = this.tarea;
    const string = JSON.stringify(tareaAsinc);
    return `La tarea asíncrona es : ${string}`;
  }
}
