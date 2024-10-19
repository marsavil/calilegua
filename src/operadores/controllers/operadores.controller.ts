import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OperadoresService } from 'src/operadores/services/operadores.service';

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
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo operador con la información suministrada'})
  createOperador(@Body() payload: any) {
    return {
      message: 'Operador creado exitosamente',
      payload,
    };
  }

  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza la información del operador identificado con el id suministrado'})
  updateOperador(@Param('id') id: number, @Body() payload: any) {
    return {
      message: `Operador ${id} actualizado exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina el operador identificado con el id suministrado'})
  deleteOperador(@Param('id', new ParseIntPipe()) id: number) {
    return {
      message: `Operador ${id} eliminado exitosamente`,
    };
  }
  @Get (':id/pedidos')
  @ApiOperation({summary: 'Devuelve una lista con todos los pedidos realizados por el operador identificado con el id suministrado'})
  getOrders( @Param('id', ParseIntPipe) id: number ){
    return this.operadoresService.getOrdersByUser(id);
  }
}
