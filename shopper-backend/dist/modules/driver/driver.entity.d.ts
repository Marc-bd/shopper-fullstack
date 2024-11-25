import { FeedbackEntity } from '../feedback/feedback.entity';
import { RideEntity } from '../ride/ride.entity';
export declare class DriverEntity {
    id: string;
    name: string;
    description: string;
    vehicle: string;
    feedback: FeedbackEntity;
    ratePerKm: number;
    minimumKm: number;
    rides: RideEntity[];
}
