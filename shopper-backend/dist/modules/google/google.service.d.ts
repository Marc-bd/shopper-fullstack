import { ConfigService } from '@nestjs/config';
import { RequestRouteDTO } from './dtos/RouteDTO';
import { ResponseRouteDTO } from './dtos/ResponseRouteDTO';
export declare class GoogleService {
    private readonly configService;
    private readonly googleMapsApiUrl;
    constructor(configService: ConfigService);
    private getApiKey;
    getBestRoute(data: RequestRouteDTO): Promise<ResponseRouteDTO>;
}
