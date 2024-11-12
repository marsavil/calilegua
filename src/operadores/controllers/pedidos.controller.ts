import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { PedidosService } from 'src/operadores/services/pedidos.service';
import { CreatePedidoDto, UpdatePedidoDto } from 'src/operadores/dtos/pedido.dto.';

@Controller('pedidos')
export class PedidosController {
  constructor (private pedidosService: PedidosService){}

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }
  @Post()
  create(@Body() payload: CreatePedidoDto) {
    console.log('se va a crear el pedido')
    return this.pedidosService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() payload: UpdatePedidoDto) {
    return this.pedidosService.update(id, payload);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}