import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { IsNumberString } from 'class-validator';

@Entity()
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  nombre: string;

  @Column({type: 'varchar'})
  apellido: string;

  @Column({type: 'varchar'})
  @IsNumberString()
  telefono: string;
}