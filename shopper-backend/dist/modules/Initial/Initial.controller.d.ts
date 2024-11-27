import { DriverService } from '../driver/driver.service';
import { CustomerService } from '../customer/customer.service';
import { IRequestInitialDTO } from './dto/RequestInitialDTO';
export declare class InitialRoutesController {
    private readonly driverService;
    private readonly customerService;
    constructor(driverService: DriverService, customerService: CustomerService);
    getData(): Promise<IRequestInitialDTO>;
}
