
import { Operador } from './operador.entity';
import { Pedido } from './pedido.entity';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comprador extends Document {

  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop({unique: true})
  telefono: string;

  @Prop({
    type: [
      {
        calle: { type: String},
        numero: { type: String },
        ciudad: { type: String }
      },
    ],
  })
  direcciones: Types.Array<Record<string, any>>

}
export const CompradorSchema = SchemaFactory.createForClass(Comprador)