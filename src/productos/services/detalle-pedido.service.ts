import { Injectable } from "@nestjs/common";
import { DetallePedido } from "src/operadores/entities/detallePedido.entity";
import { Pedido } from "src/operadores/entities/pedido.entity";
import { Producto } from "../entities/producto.entity";
import { CreateDetallePedidoDto } from "../dtos/detallePedido.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class DetallePedidoService {
  // constructor(
  //   @InjectModel (Pedido.name) private pedidoModel:Model<Pedido>,
  //   @InjectModel (DetallePedido.name) private detalleModel: Model<DetallePedido>,
  //   @InjectModel (Producto.name) private productoModel: Model<Producto>,
  // ){}

  // async create (payload: CreateDetallePedidoDto) {
  //   const pedido = await this.pedidoModel.findById(payload.pedidoId);
  //   if (!pedido) {
  //     throw new Error('Pedido no encontrado');
  //   }
  //   const producto = await this.productoModel.findById(payload.productoId);
  //   if (!producto) {
  //     throw new Error('Producto no encontrado');
  //   }
  //   const detalle = new DetallePedido();
  //   detalle.pedido = pedido;
  //   detalle.producto = producto;
  //   detalle.cantidad = payload.cantidad;
  //   await detalle.save();
  //   return {
  //     message: 'Detalle agregado con exito al pedido',
  //     pedido,
  //     detalle
  //   };
  // }
}