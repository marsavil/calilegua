import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateProductoDTO, FilterProductoDTO, UpdateProductoDTO } from 'src/productos/dtos/productos.dto';
import { ProductosService } from 'src/productos/services/productos.service';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con una cantidad determinada de productos'})
  getAllProductos(
    @Query() params: FilterProductoDTO 
  ) {
    console.log(`Buscando todos los productos`);
    return this.productsService.findAll(params);
  }
  @Get(':id')
  @ApiOperation({summary: 'Devuelve información del producto identificado con el id suministrado'})
  getProductoById(@Param('id', MongoIdPipe) id: string) {

    return this.productsService.findOne(id);
    
  }
  @Post('seed')
  @ApiOperation({summary: 'Genera y añade productos a la base de datos'})
  seedDB() {
    
    return this.productsService.seedDB();
  }
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo producto con la información suministrada'})
  createProducto(@Body() payload: CreateProductoDTO) {
  
    return this.productsService.create(payload)
  }
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza el producto identificado con el id suministrado'})
  updateProducto(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductoDTO) {

    return this.productsService.update(id, payload);
  }
  @Delete('delete/:id')
  @ApiOperation({summary: 'Elimina el producto identificado con el id suministrado'})
  deleteProducto(@Param('id', MongoIdPipe) id: string) {
    console.log(`producto a elimnar con id ${id}`)

    return this.productsService.remove(id);
  }

  // @Put(':id/category/:categoryId')
  // @ApiOperation({summary: 'Agrega el producto a una categoria'})
  // addCategoryToProduct(
  //   @Param('id', MongoIdPipe) produtoId: string,
  //   @Param('categoryId', MongoIdPipe) categoryId: string,
  // ){
  //   console.log('en el controlador')
  //   return this.productsService.addCategoryToProduct(produtoId, categoryId);
  // }
  // @Put(':id/remove/:categoryId')
  // @ApiOperation({summary: 'Quita el producto a una categoria'})
  // removeProductFromCategory(
  //   @Param('id', MongoIdPipe) produtoId: string,
  //   @Param('categoryId', MongoIdPipe) categoryId: string,
  // ){
  //   console.log('en el controlador')
  //   return this.productsService.removeProductFromCategory(produtoId, categoryId);
  // }
}
