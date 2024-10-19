import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {

  @Get()
  @ApiOperation({ summary: 'Devuelve una lista con todos los pedidos registrados'})
  getPedidos() {
    return {
      message: 'Listado de pedidos',
      data: [
        { id: 1, nombre: 'Pedido 1', precio: 100 },
        { id: 2, nombre: 'Pedido 2', precio: 200 },
      ],
    };
  }
  @Get(':id')
  @ApiOperation({ summary: 'Devuelve un pedido por su ID'})  
  getPedidoById(@Param('id', new ParseIntPipe()) id: number) {
    return {
      message: 'Pedido encontrado',
      data: { 
        id, 
        nombre: `Pedido ${id}`, 
        precio: Math.random() * 100 
      },
    };
  }
  @Post('add')
  @ApiOperation({ summary: 'Crea un nuevo pedido'})  
  createPedido(@Body() payload: any) {
    return {
      message: 'Pedido creado exitosamente',
      payload,
    };
  }
  @Put('edit/:id')
  @ApiOperation({ summary: 'Actualiza un pedido existente'})  
  editPedido(@Param('id', new ParseIntPipe()) id: number, @Body() payload: any) {
    return {
      message: `Pedido ${id} editado exitosamente`,
      id,
      payload,
    };
  }
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Elimina un pedido existente'})  
  deletePedido(@Param('id', new ParseIntPipe()) id: number) {
    return {
      message: `Pedido ${id} eliminado exitosamente`,
      id,
    };
  }
}

