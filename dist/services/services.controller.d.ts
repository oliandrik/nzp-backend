import { ServiceDto } from './dto/service.dto';
import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findAll(): Promise<import("./entities/service.entity").Service[]>;
    selectByStatus(status: any): Promise<import("./entities/service.entity").Service[]>;
    selectByType(type: any): Promise<import("./entities/service.entity").Service[]>;
    getSelectedInfoProviders(body: any): Promise<import("./entities/service.entity").Service[]>;
    createService(service: ServiceDto): Promise<{
        message: string;
    }>;
    duplicateService(id: any): Promise<{
        message: string;
    }>;
    updateService(id: any, service: ServiceDto): Promise<{
        message: string;
    }>;
    changEServiceStatus(id: any, body: any): Promise<{
        message: string;
    }>;
    bulkDelete(body: any): Promise<import("typeorm").DeleteResult>;
    deleteSelectedService(id: number): Promise<{
        message: string;
    }>;
}
