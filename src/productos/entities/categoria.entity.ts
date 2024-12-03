import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categoria extends Document {

  @Prop()
  nombre: string;

  @Prop()
  imagen: string;

  @Prop({ type: [String], default: [] }) // Define productos con un valor predeterminado
  productos: string[];

}
export const CategoriaSchema = SchemaFactory.createForClass(Categoria)