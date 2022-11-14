import { Repository } from 'typeorm';
import { Bonus } from './entities/bonus.entity';
export declare class BonusesService {
    private readonly bonusRepository;
    constructor(bonusRepository: Repository<Bonus>);
    getBonuses(): Promise<Bonus[]>;
    byId(id: any): Promise<Bonus>;
    addBonus(body: any): Promise<import("typeorm").InsertResult>;
    updateBonus(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    deleteBonus(id: any): Promise<{
        message: string;
    }>;
}
