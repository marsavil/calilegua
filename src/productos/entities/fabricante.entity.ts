import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, OneToMany } from 'typeorm';
import { Producto } from './producto.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Fabricante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  nombre: string;

  @Column({type: 'varchar'})
  direccion: string;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column({type: 'varchar'})
  imagen: string;
  
  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Producto, (product) => product.fabricante)
  products: Producto[];
}