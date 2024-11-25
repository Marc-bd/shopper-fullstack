import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { RequestRouteDTO } from './dtos/RouteDTO';
import { ResponseRouteDTO } from './dtos/ResponseRouteDTO';

@Injectable()
export class GoogleService {
  private readonly googleMapsApiUrl =
    'https://maps.googleapis.com/maps/api/directions/json';

  constructor(private readonly configService: ConfigService) {}

  private getApiKey(): string {
    const apiKey = this.configService.get<string>('GOOGLE_API_KEY');

    if (!apiKey) {
      throw new HttpException(
        'Google API key not configured.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return apiKey;
  }

  async getBestRoute(data: RequestRouteDTO): Promise<ResponseRouteDTO> {
    try {
      const apiKey = this.getApiKey();

      const response = await axios.get(this.googleMapsApiUrl, {
        params: {
          origin: data.origin,
          destination: data.destination,
          key: apiKey,
        },
      });

      if (!response.data || !response.data.routes) {
        throw new HttpException(
          'No routes found in response.',
          HttpStatus.NOT_FOUND,
        );
      }

      const route = response.data.routes[0]?.legs[0];

      if (!route) {
        throw new HttpException('No valid route found.', HttpStatus.NOT_FOUND);
      }

      return {
        origin: {
          latitude: route.start_location.lat,
          longitude: route.start_location.lng,
        },
        destination: {
          latitude: route.end_location.lat,
          longitude: route.end_location.lng,
        },
        distance: route.distance.value,
        duration: route.duration.text,
        routeResponse: response.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpException(error, HttpStatus.SERVICE_UNAVAILABLE);
      }

      throw new HttpException(
        `An unexpected error occurred: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
