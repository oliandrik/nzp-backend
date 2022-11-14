import { ProviderDto } from './dto/provider.dto';
import { ProvidersService } from './providers.service';
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    createProvider(body: ProviderDto): Promise<import("typeorm").InsertResult>;
    updateProvider(id: any, body: ProviderDto): Promise<{
        message: string;
    }>;
    bulkDelete(body: any): Promise<{
        message: string;
    }>;
    deleteProvider(id: any): Promise<{
        message: string;
    }>;
}
