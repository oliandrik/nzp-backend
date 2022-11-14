import { Repository } from 'typeorm';
import { Update } from './entities/updates.entity';
export declare class UpdatesService {
    private readonly updateRepository;
    constructor(updateRepository: Repository<Update>);
    findAll(): Promise<Update[]>;
    create(body: any, mark: any): Promise<import("typeorm").InsertResult>;
}
