import { Client } from 'src/clients/entities/client.entity';
export declare class PaymentMethod {
    id: number;
    client: Client;
    payment_method: PaymentMethod;
    created_at: Date;
    updated_at: Date;
}
