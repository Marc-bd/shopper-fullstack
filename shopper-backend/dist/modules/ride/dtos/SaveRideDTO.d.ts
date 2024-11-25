import { RequestSaveDriverDTO } from '../../driver/RequestSaveDriverDTO';
export declare class SaveRideDTO {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver: RequestSaveDriverDTO;
    value: number;
}
