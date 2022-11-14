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
exports.GeneralSettingsController = void 0;
const common_1 = require("@nestjs/common");
const general_setting_dto_1 = require("./dto/general-setting.dto");
const general_settings_service_1 = require("./general-settings.service");
let GeneralSettingsController = class GeneralSettingsController {
    constructor(generalSettingsService) {
        this.generalSettingsService = generalSettingsService;
    }
    async createSettings(body) {
        return await this.generalSettingsService.createSettings(body);
    }
    async saveChages(id, body) {
        return await this.generalSettingsService.saveChages(id, body);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [general_setting_dto_1.GeneralSettingDto]),
    __metadata("design:returntype", Promise)
], GeneralSettingsController.prototype, "createSettings", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, general_setting_dto_1.GeneralSettingDto]),
    __metadata("design:returntype", Promise)
], GeneralSettingsController.prototype, "saveChages", null);
GeneralSettingsController = __decorate([
    (0, common_1.Controller)('general-settings'),
    __metadata("design:paramtypes", [general_settings_service_1.GeneralSettingsService])
], GeneralSettingsController);
exports.GeneralSettingsController = GeneralSettingsController;
//# sourceMappingURL=general-settings.controller.js.map