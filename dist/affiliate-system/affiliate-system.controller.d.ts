import { AffiliateSystemService } from './affiliate-system.service';
import { AffiliateSystemDto } from './dto/affiliate-system.dto';
import { AffiliateSystem } from './entities/affiliate-system.entity';
export declare class AffiliateSystemController {
    private readonly affiliateSystemService;
    constructor(affiliateSystemService: AffiliateSystemService);
    getAllAffiliateSystems(): Promise<AffiliateSystem[]>;
    getAffiliateSystemById(id: any): Promise<AffiliateSystem>;
    createAffiliateSystem(body: AffiliateSystemDto): Promise<{
        message: string;
    }>;
    updateAffiliateSystem(id: any, body: AffiliateSystemDto): Promise<{
        message: string;
    }>;
    bulkDelete(body: any): Promise<{
        message: string;
    }>;
    deleteAffiliateSystem(id: any): Promise<{
        message: string;
    }>;
}
