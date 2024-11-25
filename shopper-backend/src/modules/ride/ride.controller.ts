import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RideService } from './ride.service';
import { RequestEstimateRideDTO } from './dtos/RequestEstimateRideDTO';
import { SaveRideDTO } from './dtos/SaveRideDTO';

@Controller('ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('estimate')
  async estimateRoute(@Body() requestData: RequestEstimateRideDTO) {
    return await this.rideService.estimate(requestData);
  }

  @Patch('confirm')
  async confirmRide(@Body() requestData: SaveRideDTO) {
    return this.rideService.saveRide(requestData);
  }

  @Get(':customer_id')
  async getRidesByCustomer(
    @Param('customer_id') customerId: string,
    @Query('driver_id') driverId?: string,
  ) {
    return await this.rideService.getRidesByCustomer(customerId, driverId);
  }
}
