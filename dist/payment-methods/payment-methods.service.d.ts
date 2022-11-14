import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
export declare class PaymentMethodsService {
    private readonly paymentMethodRepository;
    constructor(paymentMethodRepository: Repository<PaymentMethod>);
    byId(id: any): Promise<PaymentMethod>;
    getAllPaymentMethods(): Promise<any>;
    createPaymentMethod(body: any): Promise<PaymentMethod>;
    updateService(id: any, body: any): Promise<{
        message: string;
    }>;
    changeAccessibilityToNewUsers(id: any, param: any): Promise<{
        message: string;
    }>;
    deletePaymentMethod(id: any): Promise<any>;
}
