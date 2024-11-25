import { RideEntity } from './ride.entity';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { DriverEntity } from '../driver/driver.entity';
import { RequestEstimateRideDTO } from './dtos/RequestEstimateRideDTO';
import { GoogleService } from '../google/google.service';
import { DriverService } from '../driver/driver.service';
import { SaveRideDTO } from './dtos/SaveRideDTO';
export declare class RideService {
    private readonly rideRepository;
    private readonly customerRepository;
    private readonly driverRepository;
    private readonly googleService;
    private readonly driverService;
    constructor(rideRepository: Repository<RideEntity>, customerRepository: Repository<CustomerEntity>, driverRepository: Repository<DriverEntity>, googleService: GoogleService, driverService: DriverService);
    estimate(data: RequestEstimateRideDTO): Promise<any>;
    saveRide(data: SaveRideDTO): Promise<any>;
    getRidesByCustomer(customerId: string, driverId?: string): Promise<any>;
}
