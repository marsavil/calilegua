import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categoria extends Document {

  @Prop()
  nombre: string;

  @Prop()
  imagen: string

}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria)