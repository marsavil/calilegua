import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DetallePedido } from "src/operadores/entities/detallePedido.entity";
import { Pedido } from "src/operadores/entities/pedido.entity";
import { Repository } from "typeorm";
import { Producto } from "../entities/producto.entity";
import { CreateDetallePedidoDto } from "../dtos/detallePedido.dto";


@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository (Pedido) private pedidoRepository:Repository<Pedido>,
    @InjectRepository (DetallePedido) private detalleRepository: Repository<DetallePedido>,
    @InjectRepository (Producto) private productoRepository: Repository<Producto>,
  ){}

  async create (payload: CreateDetallePedidoDto) {
    const pedido = await this.pedidoRepository.findOne(payload.pedidoId);
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    const producto = await this.productoRepository.findOne(payload.productoId);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.cantidad = payload.cantidad;
    await this.detalleRepository.save(detalle);
    return {
      message: 'Detalle agregado con exito al pedido',
      pedido,
      detalle
    };
  }
}