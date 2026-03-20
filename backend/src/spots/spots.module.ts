import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotsService } from './spots.service';
import { SpotsController } from './spots.controller';
import { Spot } from './entities/spot.entity';
import { SeedService } from '../seed/seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Spot])],
  controllers: [SpotsController],
  providers: [SpotsService, SeedService],
})
export class SpotsModule {}