import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Operador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  email: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'varchar'})
  role: string;
}