import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';



@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return  `Bienvenido a Calilegua Backend. Conoce nuestros endpoints en ${process.env.HOST}info`;
  }
  
}