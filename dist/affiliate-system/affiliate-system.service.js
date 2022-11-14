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
exports.AffiliateSystemService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const affiliate_system_entity_1 = require("./entities/affiliate-system.entity");
let AffiliateSystemService = class AffiliateSystemService {
    constructor(affiliateSystemRepository) {
        this.affiliateSystemRepository = affiliateSystemRepository;
    }
    async findAll() {
        return await this.affiliateSystemRepository.find();
    }
    async byId(id) {
        const affiliateSystem = await this.affiliateSystemRepository.findOne({
            where: { id: id },
        });
        if (!affiliateSystem) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return affiliateSystem;
    }
    async create(body) {
        return (await this.affiliateSystemRepository.insert(Object.assign(Object.assign({}, body), { created_at: new Date(), updated_at: new Date() })),
            { message: 'Affiliate system was successfully created' });
    }
    async update(id, body) {
        await this.byId(id);
        return (await this.affiliateSystemRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() })),
            { message: 'Affiliate system  was successfully updated' });
    }
    async deleteOne(id) {
        await this.byId(id);
        return (await this.affiliateSystemRepository.delete(id),
            { message: 'Affiliate system was successfully deleted' });
    }
    async bulkDelete(ids) {
        return (await this.affiliateSystemRepository.delete(ids),
            { message: 'Affiliate systems were successfully deleted' });
    }
};
AffiliateSystemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(affiliate_system_entity_1.AffiliateSystem)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AffiliateSystemService);
exports.AffiliateSystemService = AffiliateSystemService;
//# sourceMappingURL=affiliate-system.service.js.map