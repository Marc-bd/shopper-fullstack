import { Controller, Get } from '@nestjs/common';
import { DriverService } from '../driver/driver.service';
import { CustomerService } from '../customer/customer.service';
import { IRequestInitialDTO } from './dto/RequestInitialDTO';

@Controller('app')
export class InitialRoutesController {
  constructor(
    private readonly driverService: DriverService,
    private readonly customerService: CustomerService,
  ) {}

  @Get()
  async getData(): Promise<IRequestInitialDTO> {
    const customers = await this.customerService.getAllCustomers();

    const drivers = await this.driverService.getAllDrivers();

    return {
      customers: customers,
      drivers: drivers,
    };
  }
}
