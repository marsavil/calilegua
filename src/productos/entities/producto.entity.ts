import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true})
  nombre: string;

  @Column({type: 'int'})
  precio: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'text'})
  descripcion: string;

  @Column({type: 'varchar'})
  imagen: string;

  @Column({type: 'varchar'})
  origen: string;
}