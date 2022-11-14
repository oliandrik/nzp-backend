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
exports.BonusesService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const bonus_entity_1 = require("./entities/bonus.entity");
let BonusesService = class BonusesService {
    constructor(bonusRepository) {
        this.bonusRepository = bonusRepository;
    }
    async getBonuses() {
        return await this.bonusRepository.find();
    }
    async byId(id) {
        const bonus = await this.bonusRepository.findOne({
            where: { id: id.id },
        });
        if (!bonus) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return bonus;
    }
    async addBonus(body) {
        return await this.bonusRepository.insert(Object.assign(Object.assign({}, body), { created_at: new Date(), updated_at: new Date() }));
    }
    async updateBonus(id, body) {
        await this.byId(id);
        return await this.bonusRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
    }
    async deleteBonus(id) {
        await this.byId(id);
        return (await this.bonusRepository.delete(id),
            { message: 'Bonus was successfully deleted' });
    }
};
BonusesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(bonus_entity_1.Bonus)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BonusesService);
exports.BonusesService = BonusesService;
//# sourceMappingURL=bonuses.service.js.map