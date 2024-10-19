import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductoDTO, UpdateProductoDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con una cantidad determinada de productos'})
  getAllProductos(
    @Query('limit') limit = 100, 
    @Query('offset') offset = 0, 
    @Query('brand') brand = '',
  ) {
    console.log(`Buscando todos los productos`);
    // return {
    //   message: 'Obteniendo todos los productos',
    //   data: [
    //     {
    //       id: 1,
    //       nombre: 'Producto 1',
    //       precio: 100,
    //       stock: 50,
    //     },
    //     {
    //       id: 2,
    //       nombre: 'Producto 2',
    //       precio: 200,
    //       stock: 30,
    //     },
    //     {
    //       id: 3,
    //       nombre: 'Producto 3',
    //       precio: 300,
    //       stock: 20,
    //     }
    //   ],
    // };

    return this.productsService.findAll();
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve información del producto identificado con el id suministrado'})
  getProductoById(@Param('id', new ParseIntPipe()) id: number) {
    // return {
    //   message: 'Obteniendo producto por ID',
    //   data: {
    //     id,
    //     nombre: `Producto ${id}`,
    //     precio: Math.floor(Math.random() * 1000) + 100,
    //     stock: Math.floor(Math.random() * 50) + 10,
    //   },
    // };
    return this.productsService.findOne(id);
    
  }
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo producto con la información suministrada'})
  createProducto(@Body() payload: CreateProductoDTO) {
    // return {
    //   message: 'Producto creado exitosamente',
    //   payload,
    // };
    return this.productsService.create(payload)
  }
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza el producto identificado con el id suministrado'})
  updateProducto(@Param('id', new ParseIntPipe()) id: number, @Body() payload: UpdateProductoDTO) {
    // return {
    //   message: 'Producto actualizado exitosamente',
    //   id,
    //   payload,
    // };
    return this.productsService.update(id, payload);
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina el producto identificado con el id suministrado'})
  deleteProducto(@Param('id', new ParseIntPipe()) id: number) {
    console.log(`producto a elimnar con id ${id}`)
    // return {
    //   message: 'Producto eliminado exitosamente',
    //   id,
    // };
    return this.productsService.remove(id);
  }
}
