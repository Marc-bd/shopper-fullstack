import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './modules/customer/customer.entity';
import { CustomerService } from './modules/customer/customer.service';
import { DriverEntity } from './modules/driver/driver.entity';
import { FeedbackEntity } from './modules/feedback/feedback.entity';
import { DriverService } from './modules/driver/driver.service';
import { GoogleService } from './modules/google/google.service';

import { RideEntity } from './modules/ride/ride.entity';
import { RideController } from './modules/ride/ride.controller';
import { RideService } from './modules/ride/ride.service';
import { InitialRoutesController } from './modules/Initial/Initial.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [CustomerEntity, DriverEntity, FeedbackEntity, RideEntity],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      CustomerEntity,
      DriverEntity,
      FeedbackEntity,
      RideEntity,
    ]),
  ],
  controllers: [RideController, InitialRoutesController],
  providers: [CustomerService, DriverService, GoogleService, RideService],
  exports: [CustomerService, DriverService, GoogleService, RideService],
})
export class AppModule {}
