import { Controller, Get, Query } from '@nestjs/common';
import { SpotsService } from './spots.service';

@Controller('spots')
export class SpotsController {
  constructor(private readonly spotsService: SpotsService) {}

  @Get()
  findAll(
    @Query('lat') lat?: string,
    @Query('long') long?: string,
    @Query('radiusKm') radiusKm?: string,
  ) {
    if (lat && long && radiusKm) {
      return this.spotsService.findWithinRadius(
        Number(lat),
        Number(long),
        Number(radiusKm),
      );
    }

    return this.spotsService.findAll();
  }
}