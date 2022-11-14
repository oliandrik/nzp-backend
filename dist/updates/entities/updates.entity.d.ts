import { Service } from 'src/services/entities/service.entity';
import { EServiceStatus } from 'src/services/interfaces/service.interfaces';
export declare class Update {
    id: number;
    service: Service;
    new_status: EServiceStatus;
    old_status: EServiceStatus;
    old_rate_per: number;
    new_rate_per: number;
    mark: string;
    created_at: Date;
    updated_at: Date;
}
