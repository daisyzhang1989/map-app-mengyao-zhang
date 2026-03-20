import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Spot } from '../spots/entities/spot.entity';
import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  async onModuleInit() {
    const count = await this.spotRepository.count();

    if (count > 0) {
      return;
    }

    const results: any[] = [];
    const filePath = path.join(process.cwd(), 'seed', 'spots.csv');

    await new Promise<void>((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });

    const spots = results.map((row) => ({
      name: row.name,
      category: row.category,
      lat: Number(row.lat),
      long: Number(row.long),
      address: row.address,
    }));

    await this.spotRepository.save(spots);
    console.log('Seed data imported.');
  }
}