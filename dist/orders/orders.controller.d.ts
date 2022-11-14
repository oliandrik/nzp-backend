import { OrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: any): Promise<Order[]>;
    searchByLink(link: any): Promise<Order[]>;
    searchByUsername(username: any): Promise<Order[]>;
    searchByServiceId(serviceId: any): Promise<Order[]>;
    createOrder(body: OrderDto): Promise<import("typeorm").InsertResult>;
    updateOrder(id: any, body: OrderDto): Promise<import("typeorm").UpdateResult>;
    bulkDelete(body: any): Promise<{
        message: string;
    }>;
    deleteOrder(id: any): Promise<{
        message: string;
    }>;
    exportOrdersFile(body: any): Promise<import("../export-files/entities/file.entity").ExportFile>;
}
