import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Comprador } from './comprador.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Pedido {
  @Prop({ type: Types.ObjectId, ref: Comprador.name }) // Referencia al comprador
  comprador: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }] }) // Referencia a los productos
  productos: Types.ObjectId[];

  @Prop()
  total: number;

  @Prop({ default: false }) // Campo booleano con valor predeterminado
  abonado: boolean;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
