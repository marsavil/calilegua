import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService){}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('operativo')
  getEstoyFuncionando(): string {
    return 'Estoy funcionando!';
}

@Get('/estoyok/')
getEstoyOk(): string {
  return 'sigo funcionando!';
}
}

@Controller('users')
export class UsersController {

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return 'User with ID ${id}';
  }
}
