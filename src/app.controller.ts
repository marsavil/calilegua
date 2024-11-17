import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}


  @Get('hi')
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('apikey')
  getApiKey(): string {
    return this.appService.getApiKey();
  }
  @Get('tarea')
  getTarea(): string {
    return this.appService.getTarea();
  }

  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Estoy funcionando!';
}

@Get('/estoyok/')
getEstoyOk(): string {
  return 'sigo funcionando!';
}
@Get()
getEnvs(): string {
  return this.appService.getEnvs();
}
// @Get('tasks')
//   tasks() {
// 	return this.appService.getTasks();
//   }
@Get('tareas')
  async getTasksMongo() {
    const result = await this.appService.getTasksMongo();
    return result;
  }


}

@Controller('users')
export class UsersController {

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return 'User with ID ${id}';
  }

}
