"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./modules/customer/customer.entity");
const customer_service_1 = require("./modules/customer/customer.service");
const driver_entity_1 = require("./modules/driver/driver.entity");
const feedback_entity_1 = require("./modules/feedback/feedback.entity");
const driver_service_1 = require("./modules/driver/driver.service");
const google_service_1 = require("./modules/google/google.service");
const ride_entity_1 = require("./modules/ride/ride.entity");
const ride_controller_1 = require("./modules/ride/ride.controller");
const ride_service_1 = require("./modules/ride/ride.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                ignoreEnvFile: false,
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST'),
                    port: configService.get('DB_PORT'),
                    username: configService.get('DB_USER'),
                    password: configService.get('DB_PASSWORD'),
                    database: configService.get('DB_NAME'),
                    synchronize: true,
                    entities: [customer_entity_1.CustomerEntity, driver_entity_1.DriverEntity, feedback_entity_1.FeedbackEntity, ride_entity_1.RideEntity],
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([
                customer_entity_1.CustomerEntity,
                driver_entity_1.DriverEntity,
                feedback_entity_1.FeedbackEntity,
                ride_entity_1.RideEntity,
            ]),
        ],
        controllers: [ride_controller_1.RideController],
        providers: [customer_service_1.CustomerService, driver_service_1.DriverService, google_service_1.GoogleService, ride_service_1.RideService],
        exports: [customer_service_1.CustomerService, driver_service_1.DriverService, google_service_1.GoogleService, ride_service_1.RideService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map