import { Controller, Get, Param, Inject, UseGuards, SetMetadata } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  
  //@UseGuards(ApiKeyGuard)
  @SetMetadata('isPublic', true)
  @Get('nuevo')
  newEndpoint() {
	return 'yo soy nuevo';
  }


}