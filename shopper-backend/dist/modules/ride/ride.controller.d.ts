import { RideService } from './ride.service';
import { RequestEstimateRideDTO } from './dtos/RequestEstimateRideDTO';
import { SaveRideDTO } from './dtos/SaveRideDTO';
export declare class RideController {
    private readonly rideService;
    constructor(rideService: RideService);
    estimateRoute(requestData: RequestEstimateRideDTO): Promise<any>;
    confirmRide(requestData: SaveRideDTO): Promise<any>;
    getRidesByCustomer(customerId: string, driverId?: string): Promise<any>;
}
