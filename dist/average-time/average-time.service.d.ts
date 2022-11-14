import { Repository } from 'typeorm';
import { AverageTime } from './entities/average-time.entity';
export declare class AverageTimeService {
    private readonly bonusRepository;
    constructor(bonusRepository: Repository<AverageTime>);
    update(id: any, body: any): Promise<import("typeorm").UpdateResult>;
}
