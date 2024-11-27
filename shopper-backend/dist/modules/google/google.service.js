"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let GoogleService = class GoogleService {
    constructor(configService) {
        this.configService = configService;
        this.googleMapsApiUrl = 'https://maps.googleapis.com/maps/api/directions/json';
    }
    getApiKey() {
        const apiKey = this.configService.get('GOOGLE_API_KEY');
        if (!apiKey) {
            throw new common_1.HttpException('Google API key not configured.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return apiKey;
    }
    async getBestRoute(data) {
        try {
            const apiKey = this.getApiKey();
            const response = await axios_1.default.get(this.googleMapsApiUrl, {
                params: {
                    origin: data.origin,
                    destination: data.destination,
                    key: apiKey,
                },
            });
            if (!response.data || !response.data.routes) {
                throw new common_1.HttpException('No routes found in response.', common_1.HttpStatus.NOT_FOUND);
            }
            const route = response.data.routes[0]?.legs[0];
            if (!route) {
                throw new common_1.HttpException('No valid route found.', common_1.HttpStatus.NOT_FOUND);
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
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                throw new common_1.HttpException(error, common_1.HttpStatus.SERVICE_UNAVAILABLE);
            }
            throw new common_1.HttpException(`An unexpected error occurred: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], GoogleService);
//# sourceMappingURL=google.service.js.map