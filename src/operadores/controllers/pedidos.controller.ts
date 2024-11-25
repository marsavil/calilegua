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
import { CreatePedidoDto, FilterPedidosDTO, UpdatePedidoDto } from 'src/operadores/dtos/pedido.dto.';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pedidos')
export class PedidosController {
  // constructor (private pedidosService: PedidosService){}

  // @Get()
  // @ApiOperation({summary: 'Devuelve una lista con todos los pedidos'})  

  // getAllPedidos(@Query() params: FilterPedidosDTO) {
  //   return this.pedidosService.findAll(params);
  // }
  // @Get(':id')
  // findOne(@Param('id', ParseIntPipe) id: number) {
  //   return this.pedidosService.findOne(id);
  // }
  // @Post()
  // create(@Body() payload: CreatePedidoDto) {
  //   console.log('se va a crear el pedido')
  //   return this.pedidosService.create(payload);
  // }
  // @Put(':id')
  // update(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Body() payload: UpdatePedidoDto) {
  //   return this.pedidosService.update(id, payload);
  // }
  // @Delete(':id')
  // remove(@Param('id', ParseIntPipe) id: number) {
  //   return this.pedidosService.remove(id);
  // }
}