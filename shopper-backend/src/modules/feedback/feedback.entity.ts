import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DriverEntity } from '../driver/driver.entity';

@Entity('feedbacks')
export class FeedbackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default: 5, update: false })
  maxRating: number = 5;

  @Column({ nullable: false })
  rating: number;

  @Column({ nullable: false })
  review: string;

  @OneToOne(() => DriverEntity, (driver) => driver.feedback)
  driver: DriverEntity;
}
