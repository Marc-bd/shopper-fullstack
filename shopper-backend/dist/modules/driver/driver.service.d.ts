import { OnModuleInit } from '@nestjs/common';
import { DriverEntity } from './driver.entity';
import { Repository } from 'typeorm';
import { FeedbackEntity } from '../feedback/feedback.entity';
import { RequestGetDriverDTO } from './dtos/RequestGetDriverDTO';
export declare class DriverService implements OnModuleInit {
    private driverRepository;
    private feedbackRepository;
    constructor(driverRepository: Repository<DriverEntity>, feedbackRepository: Repository<FeedbackEntity>);
    onModuleInit(): Promise<void>;
    private createMockDrivers;
    getAvaiableDrivers(distance: number): Promise<{
        id: string;
        name: string;
        description: string;
        vehicle: string;
        review: {
            rating: string;
            comment: string;
        };
        value: number;
    }[]>;
    getAllDrivers(): Promise<RequestGetDriverDTO[]>;
}
