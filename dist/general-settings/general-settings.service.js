"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralSettingsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const general_settings_entity_1 = require("./entities/general-settings.entity");
let GeneralSettingsService = class GeneralSettingsService {
    constructor(generalSettingRepository) {
        this.generalSettingRepository = generalSettingRepository;
    }
    async createSettings(body) {
        return await this.generalSettingRepository.insert(Object.assign(Object.assign({}, body), { updated_at: new Date() }));
    }
    async saveChages(id, body) {
        return await this.generalSettingRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
    }
};
GeneralSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(general_settings_entity_1.GeneralSetting)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], GeneralSettingsService);
exports.GeneralSettingsService = GeneralSettingsService;
//# sourceMappingURL=general-settings.service.js.map