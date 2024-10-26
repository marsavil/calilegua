import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Categoria  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;
}