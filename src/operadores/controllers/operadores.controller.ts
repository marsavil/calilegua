import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperadoresService } from 'src/operadores/services/operadores.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService){}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los operadores'})
  getAllOperadores() {
    return this.operadoresService.findAll();
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve la información del operador identificado con el id suministrado'})
  getOperadorById(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.findOne(id);;
  }
  // @Post('seed')
  // @ApiOperation({summary: 'Carga inicial de operadores para la base de datos'})
  // seedDB() {
  //   return this.operadoresService.seedDB();
  // }
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo operador con la información suministrada'})
  createOperador(@Body() payload: CreateOperadorDTO) {
    return this.operadoresService.create(payload);
  }

  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información del operador identificado con el id suministrado'})
  updateOperador(@Param('id', new ParseIntPipe()) id: number, @Body() payload: UpdateOperadorDTO) {
    return this.operadoresService.update(id, payload)
  }

  @Get (':id/pedidos')
  @ApiOperation({summary: 'Devuelve una lista con todos los pedidos realizados por el operador identificado con el id suministrado'})
  getOrders( @Param('id', ParseIntPipe) id: number ){
    return this.operadoresService.getOrdersByUser(id);
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina el opérador identificado con el id suministrado'})
  deleteOperador(@Param('id', new ParseIntPipe()) id: number) {
    console.log(`operador a elimnar con id ${id}`)

    return this.operadoresService.remove(id);
  }
  // @Get('tasks')
  // @ApiOperation({summary: 'Solicita el listado de tareas a realizar'})
  // getTasks() {
  //   console.log('Solcitando las tareas');
  //   return this.operadoresService.getTasks();
  // }


}
