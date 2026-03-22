import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from './entities/spot.entity';

@Injectable()
export class SpotsService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  findAll() {
    return this.spotRepository.find();
  }

  async findWithinRadius(lat: number, long: number, radiusKm: number) {
    const radiusMeters = radiusKm * 1000;

    return this.spotRepository
      .createQueryBuilder('spot')
      .where(
        `
        ST_DWithin(
          spot.location,
          ST_SetSRID(ST_MakePoint(:long, :lat), 4326)::geography,
          :radiusMeters
        )
        `,
        { lat, long, radiusMeters },
      )
      .getMany();
  }
}