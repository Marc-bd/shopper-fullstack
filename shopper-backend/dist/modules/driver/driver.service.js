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
exports.DriverService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const driver_entity_1 = require("./driver.entity");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("../feedback/feedback.entity");
let DriverService = class DriverService {
    constructor(driverRepository, feedbackRepository) {
        this.driverRepository = driverRepository;
        this.feedbackRepository = feedbackRepository;
    }
    async onModuleInit() {
        await this.createMockDrivers();
    }
    async createMockDrivers() {
        const mockDrivers = [
            {
                name: 'Homer Simpson',
                description: 'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
                vehicle: 'Plymouth Valiant 1973 rosa e enferrujado',
                ratePerKm: 2.5,
                minimumKm: 1,
                feedback: {
                    rating: 2,
                    review: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
                },
            },
            {
                name: 'Dominic Toretto',
                description: 'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
                vehicle: 'Dodge Charger R/T 1970 modificado',
                ratePerKm: 5.0,
                minimumKm: 5,
                feedback: {
                    rating: 4,
                    review: 'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
                },
            },
            {
                name: 'James Bond',
                description: 'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
                vehicle: 'Aston Martin DB5 clássico',
                ratePerKm: 10.0,
                minimumKm: 10,
                feedback: {
                    rating: 5,
                    review: 'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
                },
            },
        ];
        for (const driverData of mockDrivers) {
            const existingDriver = await this.driverRepository.findOne({
                where: { name: driverData.name },
                relations: ['feedback'],
            });
            if (existingDriver) {
                continue;
            }
            const feedback = this.feedbackRepository.create(driverData.feedback);
            const driver = this.driverRepository.create({
                name: driverData.name,
                description: driverData.description,
                vehicle: driverData.vehicle,
                ratePerKm: driverData.ratePerKm,
                minimumKm: driverData.minimumKm,
                feedback,
            });
            await this.driverRepository.save(driver);
        }
    }
    async getAvaiableDrivers(distance) {
        const allDrivers = await this.driverRepository.find({
            relations: ['feedback'],
        });
        if (allDrivers.length > 0) {
            return allDrivers
                .map((driver) => driver.minimumKm <= distance
                ? {
                    id: driver.id,
                    name: driver.name,
                    description: driver.description,
                    vehicle: driver.vehicle,
                    review: {
                        rating: `${driver.feedback.rating}/5`,
                        comment: driver.feedback.review,
                    },
                    value: (driver.ratePerKm * distance) / 1000,
                }
                : undefined)
                .filter(Boolean)
                .sort((a, b) => a.value - b.value);
        }
        return [];
    }
};
exports.DriverService = DriverService;
exports.DriverService = DriverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(driver_entity_1.DriverEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(feedback_entity_1.FeedbackEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DriverService);
//# sourceMappingURL=driver.service.js.map