import { ECategoryPosition, ECategoryStatus } from '../interfaces/service-categories.interfaces';
export declare class ServiceCategoryDto {
    id: bigint;
    category_name: string;
    position: ECategoryPosition;
    status: ECategoryStatus;
    icon: null | string;
}
