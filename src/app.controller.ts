import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

}