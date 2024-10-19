import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OperadoresService } from 'src/operadores/services/operadores.service';

@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService){}
  @Get()
  getAllOperadores() {
    return this.operadoresService.findAll();
  }
  @Get(':id')
  getOperadorById(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.findOne(id);;
  }
  @Post('add')
  createOperador(@Body() payload: any) {
    return {
      message: 'Operador creado exitosamente',
      payload,
    };
  }

  @Put('edit/:id')
  updateOperador(@Param('id') id: number, @Body() payload: any) {
    return {
      message: `Operador ${id} actualizado exitosamente`,
      payload,
    };
  }
  @Delete('delete/:id')
  deleteOperador(@Param('id') id: number) {
    return {
      message: `Operador ${id} eliminado exitosamente`,
    };
  }
  @Get (':id/pedidos')
  getOrders( @Param('id', ParseIntPipe) id: number ){
    return this.operadoresService.getOrdersByUser(id);
  }
}
