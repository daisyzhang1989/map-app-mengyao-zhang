import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

type Point = {
  type: 'Point';
  coordinates: [number, number];
};

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

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: Point;
}