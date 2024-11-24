import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Producto extends Document {

  


  @Prop({requiered: true, unique: true})
  nombre: string;

  @Prop({type: Number})
  precio: number;

  @Prop({type: Number})
  stock: number;

  @Prop()
  descripcion: string;

  @Prop()
  imagen: string;

  @Prop()
  origen: string;

}

export const ProductoSchema = SchemaFactory.createForClass(Producto)
ProductoSchema.index({ price: 1, stock: -1 })
