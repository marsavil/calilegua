import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('productos')
export class ProductosController {
  @Get()
  getAllProductos() {
    return {
      message: 'Obteniendo todos los productos',
      data: [
        {
          id: 1,
          nombre: 'Producto 1',
          precio: 100,
          stock: 50,
        },
        {
          id: 2,
          nombre: 'Producto 2',
          precio: 200,
          stock: 30,
        }
        {
          id: 3,
          nombre: 'Producto 3',
          precio: 300,
          stock: 20,
        }
      ],
    };
  }
  @Get(:id)
  getProductoById(@Param('id') id: number) {
    return {
      message: 'Obteniendo producto por ID',
      data: {
        id,
        nombre: `Producto ${id}`,
        precio: Math.floor(Math.random() * 1000) + 100,
        stock: Math.floor(Math.random() * 50) + 10,
      },
    }
  }
  @Post('add')
  createProducto(@Body() payload: any) {
    return {
      message: 'Producto creado exitosamente',
      payload,
    };
  }
  @Put('edit/:id')
  updateProducto(@Param('id') id: number, @Body() payload: any) {
    return {
      message: 'Producto actualizado exitosamente',
      id,
      payload,
    };
  }
  @Delete('delete/:id')
  deleteProducto(@Param('id') id: number) {
    return {
      message: 'Producto eliminado exitosamente',
      id,
    };
  }
  
}
