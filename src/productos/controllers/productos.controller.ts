import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { MongoIdPipe } from '../../common/mongo-id.pipe';
import { CreateProductoDTO, FilterProductoDTO, UpdateProductoDTO } from '../dtos/productos.dto';
import { ProductosService } from '../services/productos.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}
  //@Public()
  //@Roles(Role.ADMIN)
  @Get()
  @ApiOperation({summary: 'Devuelve una lista con una cantidad determinada de productos'})
  getAllProductos(
    @Query() params: FilterProductoDTO 
  ) {
    console.log(`Buscando todos los productos`);
    return this.productsService.findAll(params);
  }
  //@Public()
  @Get(':id')
  @ApiOperation({summary: 'Devuelve información del producto identificado con el id suministrado'})
  getProductoById(@Param('id', MongoIdPipe) id: string) {

    return this.productsService.findOne(id);
    
  }
  @Get('/categoria/:categoria')
  @ApiOperation({summary: 'Devuelve el listado de productos asigndos a una categoria'})
  getProductosByCategory(@Param('categoria', MongoIdPipe) categoria: string) {
    
    return this.productsService.findByCategory(categoria);
  }
  @Roles(Role.ADMIN)  
  @Post('seed')
  @ApiOperation({summary: 'Genera y añade productos a la base de datos'})
  seedDB() {
    
    return this.productsService.seedDB();
  }
  @Roles(Role.ADMIN)
  @Post('add')
  @ApiOperation({summary: 'Crea un nuevo producto con la información suministrada'})
  createProducto(@Body() payload: CreateProductoDTO) {
    console.log("se va a cargar un nuevo producto")
  
    return this.productsService.create(payload)
  }

  @Roles(Role.ADMIN)  
  @Put('edit/:id')
  @ApiOperation({summary: 'Actualiza el producto identificado con el id suministrado'})
  updateProducto(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateProductoDTO) {

    return this.productsService.update(id, payload);
  }
  @Roles(Role.ADMIN)
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
