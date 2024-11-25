import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { FeedbackDTO } from '../feedback/dtos/feedbackDTO';
import { RideEntity } from '../ride/ride.entity';

@Entity('drivers')
export class DriverEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  vehicle: string;

  @OneToOne(() => FeedbackEntity, (feedback: FeedbackDTO) => feedback.driver, {
    cascade: true,
  })
  @JoinColumn()
  feedback: FeedbackEntity;

  @Column({ nullable: false, type: 'float' })
  ratePerKm: number;

  @Column({ nullable: false, type: 'int' })
  minimumKm: number;

  @OneToMany(() => RideEntity, (ride) => ride.driver)
  rides: RideEntity[];
}
