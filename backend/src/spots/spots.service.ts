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
    const spots = await this.spotRepository.find();

    return spots.filter((spot) => {
      const distance = this.getDistanceKm(lat, long, spot.lat, spot.long);
      return distance <= radiusKm;
    });
  }

  private getDistanceKm(
    lat1: number,
    long1: number,
    lat2: number,
    long2: number,
  ) {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const earthRadiusKm = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLong = toRad(long2 - long1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }
}