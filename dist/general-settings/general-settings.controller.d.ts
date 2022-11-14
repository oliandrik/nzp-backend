import { GeneralSettingDto } from './dto/general-setting.dto';
import { GeneralSettingsService } from './general-settings.service';
export declare class GeneralSettingsController {
    private readonly generalSettingsService;
    constructor(generalSettingsService: GeneralSettingsService);
    createSettings(body: GeneralSettingDto): Promise<import("typeorm").InsertResult>;
    saveChages(id: number, body: GeneralSettingDto): Promise<import("typeorm").UpdateResult>;
}
