import { AverageTimeService } from './average-time.service';
export declare class AverageTimeController {
    private readonly averageTimeService;
    constructor(averageTimeService: AverageTimeService);
    updateDisplayOn(id: any, body: any): Promise<import("typeorm").UpdateResult>;
}
