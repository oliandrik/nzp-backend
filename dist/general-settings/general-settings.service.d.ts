import { Repository } from 'typeorm';
import { GeneralSetting } from './entities/general-settings.entity';
export declare class GeneralSettingsService {
    private readonly generalSettingRepository;
    constructor(generalSettingRepository: Repository<GeneralSetting>);
    createSettings(body: any): Promise<import("typeorm").InsertResult>;
    saveChages(id: any, body: any): Promise<import("typeorm").UpdateResult>;
}
