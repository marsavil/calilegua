import { IsNumberString } from 'class-validator';
import { Operador } from './operador.entity';
import { Pedido } from './pedido.entity';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Comprador extends Document {

  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  @IsNumberString()
  telefono: string;

}
export const CompradorSchema = SchemaFactory.createForClass(Comprador)