import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Spot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('float')
  lat: number;

  @Column('float')
  long: number;

  @Column()
  address: string;
}
