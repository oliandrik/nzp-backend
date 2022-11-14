import { BonusesService } from './bonuses.service';
import { BonusDto } from './dto/bonus.dto';
export declare class BonusesController {
    private readonly bonusesService;
    constructor(bonusesService: BonusesService);
    getBonuses(): Promise<import("./entities/bonus.entity").Bonus[]>;
    getBonuse(id: any): Promise<import("./entities/bonus.entity").Bonus>;
    addBonus(body: BonusDto): Promise<import("typeorm").InsertResult>;
    updateBonus(id: any, body: BonusDto): Promise<import("typeorm").UpdateResult>;
    deleteBonus(id: any): any;
}
