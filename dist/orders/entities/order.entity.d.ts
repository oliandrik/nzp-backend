import { Client } from 'src/clients/entities/client.entity';
import { Service } from 'src/services/entities/service.entity';
import { EOrderMode, EOrderStatus } from '../interfaces/order.interfaces';
export declare class Order {
    id: number;
    client: Client;
    charge: number;
    link: string;
    start_count: number;
    quantity: number;
    service: Service;
    status: EOrderStatus;
    remains: number;
    mode: EOrderMode;
    created_at: Date;
    updated_at: Date;
}
