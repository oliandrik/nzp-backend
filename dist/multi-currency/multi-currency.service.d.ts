import { Repository } from 'typeorm';
import { MultiCurrency } from './entities/multi-currency.entity';
export declare class MultiCurrencyService {
    private readonly multiCurrencyRepository;
    constructor(multiCurrencyRepository: Repository<MultiCurrency>);
    findAll(): Promise<MultiCurrency[]>;
    create(body: any): Promise<import("typeorm").InsertResult>;
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    multipleDiactivation(ids: any): Promise<import("typeorm").UpdateResult>;
    deleteOne(id: any): Promise<import("typeorm").DeleteResult>;
}
