import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
export declare class ProvidersService {
    private readonly providerRepository;
    constructor(providerRepository: Repository<Provider>);
    findAll(): Promise<Provider[]>;
    byId(id: any): Promise<Provider>;
    create(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<{
        message: string;
    }>;
    deleteOne(id: any): Promise<{
        message: string;
    }>;
    bulkDelete(ids: []): Promise<{
        message: string;
    }>;
}
