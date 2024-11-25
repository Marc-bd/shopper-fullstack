import { DriverEntity } from '../../driver/driver.entity';

export interface FeedbackDTO {
  id: string;

  maxRating: number;

  rating: number;

  review: string;

  driver: DriverEntity;
}
