import { OnModuleInit } from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
export declare class CustomerService implements OnModuleInit {
    private customerRepository;
    constructor(customerRepository: Repository<CustomerEntity>);
    seedCustomers(): Promise<void>;
    onModuleInit(): Promise<void>;
}
