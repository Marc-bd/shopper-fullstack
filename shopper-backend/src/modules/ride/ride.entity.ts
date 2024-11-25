import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DriverEntity } from '../driver/driver.entity';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('rides')
export class RideEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.rides, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => DriverEntity, (driver) => driver.rides, { nullable: false })
  @JoinColumn({ name: 'driver_id' })
  driver: DriverEntity;

  @Column({ nullable: false })
  origin: string;

  @Column({ nullable: false })
  destination: string;

  @Column({ nullable: false })
  distance: number;

  @Column({ nullable: false })
  duration: string;

  @Column({ nullable: false, type: 'float' })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
