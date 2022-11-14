import { ExportFilesService } from 'src/export-files/export-files.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly exportFileService;
    constructor(orderRepository: Repository<Order>, exportFileService: ExportFilesService);
    findAll(): Promise<Order[]>;
    byId(id: any): Promise<Order[]>;
    byLink(link: any): Promise<Order[]>;
    byUsername(username: any): Promise<Order[]>;
    byServiceId(serviceId: any): Promise<Order[]>;
    create(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    deleteOne(id: number): Promise<{
        message: string;
    }>;
    bulkDelete(ids: []): Promise<{
        message: string;
    }>;
    exportOrdersFile(body: any): Promise<import("../export-files/entities/file.entity").ExportFile>;
}
