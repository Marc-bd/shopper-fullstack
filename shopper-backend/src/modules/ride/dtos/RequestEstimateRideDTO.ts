import { IsNotEmpty, IsString } from 'class-validator';

export class RequestEstimateRideDTO {
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;
}
