import { DriverEntity } from '../driver/driver.entity';
export declare class FeedbackEntity {
    id: string;
    maxRating: number;
    rating: number;
    review: string;
    driver: DriverEntity;
}
