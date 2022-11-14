import { Provider } from 'src/providers/entities/provider.entity';
import { ServiceCategory } from 'src/service-categories/entities/service-categories.entity';
import { EServiceCancel, EServiceDripFeed, EServiceLinkDuplicate, EServiceMode, EServiceStatus, EServiceType } from '../interfaces/service.interfaces';
export declare class ServiceDto {
    id: bigint;
    service_name: string;
    category: ServiceCategory;
    mode: EServiceMode;
    type: EServiceType;
    provider: Provider;
    drip_feed: EServiceDripFeed;
    cancel: EServiceCancel;
    rate_per: number;
    min_order: number;
    max_order: number;
    link_duplicate: EServiceLinkDuplicate;
    increment: number;
    overflow: number;
    status: EServiceStatus;
}
