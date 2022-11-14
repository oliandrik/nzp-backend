import { UpdatesService } from './updates.service';
export declare class UpdatesController {
    private readonly updatesService;
    constructor(updatesService: UpdatesService);
    findAll(): Promise<import("./entities/updates.entity").Update[]>;
}
