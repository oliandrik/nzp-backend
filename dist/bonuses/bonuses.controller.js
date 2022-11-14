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
exports.BonusesController = void 0;
const common_1 = require("@nestjs/common");
const bonuses_service_1 = require("./bonuses.service");
const bonus_dto_1 = require("./dto/bonus.dto");
let BonusesController = class BonusesController {
    constructor(bonusesService) {
        this.bonusesService = bonusesService;
    }
    async getBonuses() {
        return await this.bonusesService.getBonuses();
    }
    async getBonuse(id) {
        return await this.bonusesService.byId(id.id);
    }
    async addBonus(body) {
        return await this.bonusesService.addBonus(body);
    }
    async updateBonus(id, body) {
        return await this.bonusesService.updateBonus(id, body);
    }
    async deleteBonus(id) {
        return await this.deleteBonus(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "getBonuses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "getBonuse", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bonus_dto_1.BonusDto]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "addBonus", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bonus_dto_1.BonusDto]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "updateBonus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BonusesController.prototype, "deleteBonus", null);
BonusesController = __decorate([
    (0, common_1.Controller)('bonuses'),
    __metadata("design:paramtypes", [bonuses_service_1.BonusesService])
], BonusesController);
exports.BonusesController = BonusesController;
//# sourceMappingURL=bonuses.controller.js.map