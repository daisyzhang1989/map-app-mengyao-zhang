import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { GeocodeService } from './geocode.service';

@Controller('geocode')
export class GeocodeController {
  constructor(private readonly geocodeService: GeocodeService) {}

  @Get('reverse')
  async reverse(
    @Query('lat') lat?: string,
    @Query('long') long?: string,
  ) {
    if (!lat || !long) {
      throw new BadRequestException('lat and long are required');
    }

    const latNum = Number(lat);
    const longNum = Number(long);

    if (Number.isNaN(latNum) || Number.isNaN(longNum)) {
      throw new BadRequestException('lat and long must be valid numbers');
    }

    return this.geocodeService.reverseGeocode(latNum, longNum);
  }
}
