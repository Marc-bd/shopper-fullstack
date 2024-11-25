import { DriverEntity } from '../driver/driver.entity';
import { CustomerEntity } from '../customer/customer.entity';
export declare class RideEntity {
    id: string;
    customer: CustomerEntity;
    driver: DriverEntity;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
}
