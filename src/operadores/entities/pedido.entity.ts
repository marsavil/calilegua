
import { Operador } from './operador.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallePedido.entity';
import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Pedido {

    @Prop({ type: [{ type: Types.ObjectId, ref: Producto.name }]})
    productos: Types.Array<Producto>;

    @Prop({ type: [{ type: Types.ObjectId, ref: Comprador.name }]})
    comprador: Types.ObjectId;
 
}
export const PedidoSchema = SchemaFactory.createForClass(Pedido)
