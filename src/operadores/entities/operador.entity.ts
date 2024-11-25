import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comprador } from './comprador.entity';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Operador extends Document {

  @Prop({required:true, unique: true})
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
  
}
export const OperadorSchema = SchemaFactory.createForClass(Operador)