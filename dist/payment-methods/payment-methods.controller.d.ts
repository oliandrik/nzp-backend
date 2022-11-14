import { PaymentMethodDto } from './dto/payment-methods.dto';
import { PaymentMethodsService } from './payment-methods.service';
export declare class PaymentMethodsController {
    private readonly paymentMethodsService;
    constructor(paymentMethodsService: PaymentMethodsService);
    getAllPaymentMethods(): Promise<any>;
    getPaymentMethod(id: any): Promise<import("./entities/payment-method.entity").PaymentMethod>;
    createPaymentMethod(body: PaymentMethodDto): Promise<import("./entities/payment-method.entity").PaymentMethod>;
    changeAccessibilityToNewUsers(id: any, body: any): Promise<{
        message: string;
    }>;
    deletePaymentMethod(id: any): Promise<any>;
}
