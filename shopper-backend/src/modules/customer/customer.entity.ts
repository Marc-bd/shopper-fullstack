import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RideEntity } from '../ride/ride.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', unique: true })
  name: string;

  @OneToMany(() => RideEntity, (ride) => ride.customer)
  rides: RideEntity[];
}
