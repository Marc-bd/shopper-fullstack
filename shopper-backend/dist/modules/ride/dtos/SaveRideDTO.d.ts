import { RequestSaveDriverDTO } from '../../driver/dtos/RequestSaveDriverDTO';
export declare class SaveRideDTO {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: RequestSaveDriverDTO;
    value: number;
}
