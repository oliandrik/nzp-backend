import { Repository } from 'typeorm';
import { AffiliateSystemDto } from './dto/affiliate-system.dto';
import { AffiliateSystem } from './entities/affiliate-system.entity';
export declare class AffiliateSystemService {
    private readonly affiliateSystemRepository;
    constructor(affiliateSystemRepository: Repository<AffiliateSystem>);
    findAll(): Promise<AffiliateSystem[]>;
    byId(id: any): Promise<AffiliateSystem>;
    create(body: AffiliateSystemDto): Promise<{
        message: string;
    }>;
    update(id: number, body: AffiliateSystemDto): Promise<{
        message: string;
    }>;
    deleteOne(id: number): Promise<{
        message: string;
    }>;
    bulkDelete(ids: []): Promise<{
        message: string;
    }>;
}
