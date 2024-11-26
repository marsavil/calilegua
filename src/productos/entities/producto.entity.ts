import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import  { Fabricante } from './fabricante.entity'

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

  @Prop(
    raw ({
      nombre: { type: String },
      imagen: { type: String }
    }),
  )
  categoria: Record<string, any>; // se agrega la propiedad subdocumento

  @Prop({ type: Types.ObjectId, ref: Fabricante.name })
  fabricante: Fabricante | Types.ObjectId

}

export const ProductoSchema = SchemaFactory.createForClass(Producto)
ProductoSchema.index({ price: 1, stock: -1 })
