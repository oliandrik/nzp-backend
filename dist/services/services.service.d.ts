import { UpdatesService } from 'src/updates/updates.service';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
export declare class ServicesService {
    private readonly serviceRepository;
    private readonly updService;
    constructor(serviceRepository: Repository<Service>, updService: UpdatesService);
    findAll(): Promise<Service[]>;
    byId(id: any): Promise<Service>;
    selectByStatus(status: string): Promise<Service[]>;
    selectByType(param: any): Promise<Service[]>;
    getSelectedInfoProviders(providers: []): Promise<Service[]>;
    createService(body: any): Promise<{
        message: string;
    }>;
    duplicateService(id: any): Promise<{
        message: string;
    }>;
    updateService(id: any, service: any): Promise<{
        message: string;
    }>;
    changeStatus(id: any, status: string): Promise<{
        message: string;
    }>;
    deleteSelectedService(id: any): Promise<{
        message: string;
    }>;
    bulkDelete(ids: []): Promise<import("typeorm").DeleteResult>;
}
