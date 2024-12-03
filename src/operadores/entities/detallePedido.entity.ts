import { Producto } from 'src/productos/entities/producto.entity';
import { Pedido } from './pedido.entity';
import { Exclude } from 'class-transformer';
import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class DetallePedido extends Document {


}
export const DetallePedidoSchema = SchemaFactory.createForClass(DetallePedido)