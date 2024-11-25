import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Fabricante extends Document{


  @Prop({required:true, unique: true})
  nombre: string;

  @Prop()
  direccion: string;

  @Prop({required:true, unique: true})
  email: string;

  @Prop()
  imagen: string;
  

}
export const FabricanteSchema = SchemaFactory.createForClass(Fabricante)