import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { PedidosService } from 'src/operadores/services/pedidos.service';
import { AddProductsToOrderDto, CreatePedidoDto, FilterPedidosDto, UpdatePedidoDto } from 'src/operadores/dtos/pedido.dto.';
import { ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('pedidos')
export class PedidosController {
  constructor (private pedidosService: PedidosService){}

  @Get()
  @ApiOperation({summary: 'Devuelve una lista con todos los pedidos'})  

  getAllPedidos(@Query() params: FilterPedidosDto) {
    return this.pedidosService.findAll(params);
  }
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.pedidosService.findOne(id);
  }
  @Post('add')
  create(@Body() payload: CreatePedidoDto) {
    console.log('se va a crear el pedido')
    return this.pedidosService.create(payload);
  }
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Body() payload: UpdatePedidoDto) {
  //   return this.pedidosService.update(id, payload);
  // }
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.pedidosService.remove(id);
  }
  @Put(':id/productos') //agrega productos al pedido
  addProducts( @Param ( 'id' ) id: string, @Body() payload: AddProductsToOrderDto) {
    return this.pedidosService.addProductos( id, payload.productsIds)
  }

  @Delete(':id/producto/:productoId') // quita un producto del pedido
  removeProduct (
    @Param('id') id: string,
    @Param( 'productoId' ) productoId: string,
  ) {
    console.log('tomo la ruta')
    return this.pedidosService.removeProducto( id, productoId )
  }
}