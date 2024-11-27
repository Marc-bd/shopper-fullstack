import { CustomerEntity } from '../../customer/customer.entity';
import { RequestGetDriverDTO } from '../../driver/dtos/RequestGetDriverDTO';
export interface IRequestInitialDTO {
    customers: CustomerEntity[];
    drivers: RequestGetDriverDTO[];
}
