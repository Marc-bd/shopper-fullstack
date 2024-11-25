import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerDTO } from './dtos/custumerDTO';

@Injectable()
export class CustomerService implements OnModuleInit {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async seedCustomers(): Promise<void> {
    const mockedCustomers: CustomerDTO[] = [
      { name: 'Pedro' },
      { name: 'Amanda' },
      { name: 'Sergio' },
      { name: 'Camila' },
      { name: 'Juliana' },
      { name: 'Marina' },
      { name: 'Marcos' },
      { name: 'Felipe' },
    ];

    const existingCustomers = await this.customerRepository.find({
      select: ['name'],
    });

    const existingCustomerNames = existingCustomers.map(
      (customer) => customer.name,
    );

    for (const customer of mockedCustomers) {
      if (!existingCustomerNames.includes(customer.name)) {
        const newCustomer = this.customerRepository.create(customer);
        await this.customerRepository.save(newCustomer);
      }
    }
  }

  async onModuleInit() {
    await this.seedCustomers();
  }
}
