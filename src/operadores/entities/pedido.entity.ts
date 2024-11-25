
import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude, Expose } from 'class-transformer';
import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Pedido {


 
}
export const PedidoSchema = SchemaFactory.createForClass(Pedido)
