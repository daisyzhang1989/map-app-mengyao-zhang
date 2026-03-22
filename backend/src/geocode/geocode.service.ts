import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeocodeService {
  constructor(private readonly httpService: HttpService) {}

  async reverseGeocode(lat: number, long: number) {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      throw new InternalServerErrorException(
        'GOOGLE_MAPS_API_KEY is not set',
      );
    }

    const url = 'https://maps.googleapis.com/maps/api/geocode/json';

    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          latlng: `${lat},${long}`,
          key: apiKey,
          language: 'ja',
        },
      }),
    );

    const data = response.data;

    if (data.status !== 'OK' || !data.results?.length) {
      return {
        address: '',
      };
    }

    return {
      address: data.results[0].formatted_address,
    };
  }
}