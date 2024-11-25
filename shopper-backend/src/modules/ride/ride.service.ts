import { InjectRepository } from '@nestjs/typeorm';
import { RideEntity } from './ride.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { DriverEntity } from '../driver/driver.entity';
import { RequestEstimateRideDTO } from './dtos/RequestEstimateRideDTO';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { GoogleService } from '../google/google.service';
import { DriverService } from '../driver/driver.service';
import Any = jasmine.Any;
import { SaveRideDTO } from './dtos/SaveRideDTO';

export class RideService {
  constructor(
    @InjectRepository(RideEntity)
    private readonly rideRepository: Repository<RideEntity>,
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    @InjectRepository(DriverEntity)
    private readonly driverRepository: Repository<DriverEntity>,
    private readonly googleService: GoogleService,
    private readonly driverService: DriverService,
  ) {}

  async estimate(data: RequestEstimateRideDTO): Promise<any> {
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
      throw new NotFoundException('Customer not found');
    }

    const availableDrivers = await this.driverService.getAvaiableDrivers(
      route.distance,
    );

    return {
      ...route,
      options: availableDrivers,
    };
  }

  async saveRide(data: SaveRideDTO): Promise<any> {
    const customerExists = await this.customerRepository.findOne({
      where: {
        id: data.customer_id,
      },
    });

    if (!customerExists) {
      throw new NotFoundException('Customer not found');
    }

    const driverExist = await this.driverRepository.findOne({
      where: {
        id: data.driver.id,
      },
    });

    if (!driverExist) {
      throw new NotFoundException('Driver not found');
    }

    if (data.distance < driverExist.minimumKm) {
      throw new NotAcceptableException('Invalid distance');
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

  async getRidesByCustomer(
    customerId: string,
    driverId?: string,
  ): Promise<any> {
    if (!customerId) {
      throw new NotFoundException('O ID do usuário é obrigatório.');
    }

    if (driverId) {
      const driverExists = await this.driverRepository.findOne({
        where: { id: driverId },
      });

      if (!driverExists) {
        throw new NotFoundException('Motorista não encontrado.');
      }
    }

    const queryBuilder = this.rideRepository
      .createQueryBuilder('ride')
      .innerJoinAndSelect(
        'ride.customer',
        'customer',
        'customer.id = :customerId',
        { customerId },
      )
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
}
