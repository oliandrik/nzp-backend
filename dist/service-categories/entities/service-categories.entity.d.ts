import { Service } from 'src/services/entities/service.entity';
import { ECategoryPosition, ECategoryStatus } from '../interfaces/service-categories.interfaces';
export declare class ServiceCategory {
    id: number;
    category_name: string;
    position: ECategoryPosition;
    status: ECategoryStatus;
    icon: null | string;
    created_at: Date;
    updated_at: Date;
    services: Service[];
}
