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
exports.AffiliateSystemController = void 0;
const common_1 = require("@nestjs/common");
const affiliate_system_service_1 = require("./affiliate-system.service");
const affiliate_system_dto_1 = require("./dto/affiliate-system.dto");
let AffiliateSystemController = class AffiliateSystemController {
    constructor(affiliateSystemService) {
        this.affiliateSystemService = affiliateSystemService;
    }
    async getAllAffiliateSystems() {
        return await this.affiliateSystemService.findAll();
    }
    async getAffiliateSystemById(id) {
        return await this.affiliateSystemService.byId(id);
    }
    async createAffiliateSystem(body) {
        return await this.affiliateSystemService.create(body);
    }
    async updateAffiliateSystem(id, body) {
        return await this.affiliateSystemService.update(id, body);
    }
    async bulkDelete(body) {
        return await this.affiliateSystemService.bulkDelete(body.ids);
    }
    async deleteAffiliateSystem(id) {
        return await this.affiliateSystemService.deleteOne(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "getAllAffiliateSystems", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "getAffiliateSystemById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affiliate_system_dto_1.AffiliateSystemDto]),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "createAffiliateSystem", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, affiliate_system_dto_1.AffiliateSystemDto]),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "updateAffiliateSystem", null);
__decorate([
    (0, common_1.Delete)('bulk-delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AffiliateSystemController.prototype, "deleteAffiliateSystem", null);
AffiliateSystemController = __decorate([
    (0, common_1.Controller)('affiliate-system'),
    __metadata("design:paramtypes", [affiliate_system_service_1.AffiliateSystemService])
], AffiliateSystemController);
exports.AffiliateSystemController = AffiliateSystemController;
//# sourceMappingURL=affiliate-system.controller.js.map