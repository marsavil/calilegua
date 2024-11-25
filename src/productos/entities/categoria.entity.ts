import { Producto } from './producto.entity';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Categoria  {

  @Prop()
  nombre: string;

}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria)