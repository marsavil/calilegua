import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('pedidos')
export class PedidosController {

  @Get()
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
  getPedidoById(@Param('id') id: number) {
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
  createPedido(@Body() payload: any) {
    return {
      message: 'Pedido creado exitosamente',
      payload,
    };
  }
  @Put('edit/:id')
  editPedido(@Param('id') id: number, @Body() payload: any) {
    return {
      message: `Pedido ${id} editado exitosamente`,
      id,
      payload,
    };
  }
  @Delete('delete/:id')
  deletePedido(@Param('id') id: number) {
    return {
      message: `Pedido ${id} eliminado exitosamente`,
      id,
    };
  
}

