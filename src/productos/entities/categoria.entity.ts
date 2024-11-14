import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Producto } from './producto.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Categoria  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToMany(() => Producto, (producto) => producto.categorias)
  @JoinTable({
    name: 'categorias_productos',
    joinColumn: {
        name: 'categoria_id' },
    inverseJoinColumn: { 
      name: 'product_id' },
  })// solo se declara en una parte de la relación

  productos: Producto[]
}