import { MultiCurrencyService } from './multi-currency.service';
export declare class MultiCurrencyController {
    private readonly multiCurrencyService;
    constructor(multiCurrencyService: MultiCurrencyService);
    getAll(): Promise<import("./entities/multi-currency.entity").MultiCurrency[]>;
    createCurrency(body: any): Promise<import("typeorm").InsertResult>;
    bulkUpdate(body: any): Promise<import("typeorm").UpdateResult>;
    updateCurrency(id: any, body: any): Promise<import("typeorm").UpdateResult>;
    deleteCurrency(id: any): Promise<import("typeorm").DeleteResult>;
}
