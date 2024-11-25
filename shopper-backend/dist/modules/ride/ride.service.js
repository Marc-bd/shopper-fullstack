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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RideService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const ride_entity_1 = require("./ride.entity");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("../customer/customer.entity");
const driver_entity_1 = require("../driver/driver.entity");
const common_1 = require("@nestjs/common");
const google_service_1 = require("../google/google.service");
const driver_service_1 = require("../driver/driver.service");
let RideService = class RideService {
    constructor(rideRepository, customerRepository, driverRepository, googleService, driverService) {
        this.rideRepository = rideRepository;
        this.customerRepository = customerRepository;
        this.driverRepository = driverRepository;
        this.googleService = googleService;
        this.driverService = driverService;
    }
    async estimate(data) {
        console.log('data', data);
        const route = await this.googleService.getBestRoute({
            origin: data.origin,
            destination: data.destination,
        });
        const customerExists = await this.customerRepository.findOne({
            where: {
                id: data.customer_id,
            },
        });
        if (!customerExists) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const availableDrivers = await this.driverService.getAvaiableDrivers(route.distance);
        return {
            ...route,
            options: availableDrivers,
        };
    }
    async saveRide(data) {
        const customerExists = await this.customerRepository.findOne({
            where: {
                id: data.customer_id,
            },
        });
        if (!customerExists) {
            throw new common_1.NotFoundException('Customer not found');
        }
        const driverExist = await this.driverRepository.findOne({
            where: {
                id: data.driver.id,
            },
        });
        if (!driverExist) {
            throw new common_1.NotFoundException('Driver not found');
        }
        if (data.distance < driverExist.minimumKm) {
            throw new common_1.NotAcceptableException('Invalid distance');
        }
        await this.rideRepository.save({
            customer: customerExists,
            driver: driverExist,
            origin: data.origin,
            destination: data.destination,
            distance: data.distance,
            duration: data.duration,
            value: data.value,
        });
        return {
            success: true,
        };
    }
    async getRidesByCustomer(customerId, driverId) {
        if (!customerId) {
            throw new common_1.NotFoundException('O ID do usuário é obrigatório.');
        }
        if (driverId) {
            const driverExists = await this.driverRepository.findOne({
                where: { id: driverId },
            });
            if (!driverExists) {
                throw new common_1.NotFoundException('Motorista não encontrado.');
            }
        }
        const queryBuilder = this.rideRepository
            .createQueryBuilder('ride')
            .innerJoinAndSelect('ride.customer', 'customer', 'customer.id = :customerId', { customerId })
            .leftJoinAndSelect('ride.driver', 'driver')
            .orderBy('ride.createdAt', 'DESC');
        if (driverId) {
            queryBuilder.andWhere('ride.driver.id = :driverId', { driverId });
        }
        const rides = await queryBuilder.getMany();
        return {
            customer_id: customerId,
            rides: rides.map((ride) => ({
                id: ride.id,
                date: ride.createdAt,
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: ride.driver
                    ? {
                        id: ride.driver.id,
                        name: ride.driver.name,
                    }
                    : null,
                value: ride.value,
            })),
        };
    }
};
exports.RideService = RideService;
exports.RideService = RideService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(ride_entity_1.RideEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        google_service_1.GoogleService,
        driver_service_1.DriverService])
], RideService);
//# sourceMappingURL=ride.service.js.map