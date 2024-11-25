import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RequestSaveDriverDTO } from '../../driver/RequestSaveDriverDTO';

export class SaveRideDTO {
  @IsNotEmpty()
  @IsString()
  customer_id: string;

  @IsNotEmpty()
  @IsString()
  origin: string;

  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsNotEmpty()
  @IsNumber()
  distance: number;

  @IsNotEmpty()
  @IsString()
  duration: string;

  @IsNotEmpty()
  driver: RequestSaveDriverDTO;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
