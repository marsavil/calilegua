import { Controller, Get, Param, Inject, UseGuards } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @UseGuards(ApiKeyGuard)
  @Public() // declara el endpoint de acceso irrestricto
  @Get('nuevo')
  newEndpoint() {
	return 'yo soy nuevo';
  }


}