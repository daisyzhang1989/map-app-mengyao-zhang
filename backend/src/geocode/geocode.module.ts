import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { GeocodeService } from './geocode.service';
import { GeocodeController } from './geocode.controller';

@Module({
  imports: [HttpModule],
  providers: [GeocodeService],
  controllers: [GeocodeController]
})
export class GeocodeModule {}
