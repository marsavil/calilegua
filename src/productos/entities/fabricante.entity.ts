import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

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
}