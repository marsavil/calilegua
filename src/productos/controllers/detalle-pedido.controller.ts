import { Controller, OnModuleDestroy, Body, Post } from "@nestjs/common";
import { DetallePedidoService } from "../services/detalle-pedido.service";
import { CreateDetallePedidoDto } from "../dtos/detallePedido.dto";

@Controller("detalle-pedidos")
export class DetallePedidosController  {
  // constructor (private detalleService: DetallePedidoService) {}

  // @Post()
  // create (
  //   @Body() payload: CreateDetallePedidoDto) {
  //     return this.detalleService.create(payload);
  //   }
}