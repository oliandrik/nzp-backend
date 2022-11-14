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
exports.MultiCurrencyService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const multi_currency_entity_1 = require("./entities/multi-currency.entity");
let MultiCurrencyService = class MultiCurrencyService {
    constructor(multiCurrencyRepository) {
        this.multiCurrencyRepository = multiCurrencyRepository;
    }
    async findAll() {
        return await this.multiCurrencyRepository.find();
    }
    async create(body) {
        return await this.multiCurrencyRepository.insert(Object.assign(Object.assign({}, body), { created_at: new Date(), updated_at: new Date() }));
    }
    async update(id, body) {
        return await this.multiCurrencyRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
    }
    async multipleDiactivation(ids) {
        return await this.multiCurrencyRepository
            .createQueryBuilder()
            .update(multi_currency_entity_1.MultiCurrency)
            .set({
            activation: 2,
        })
            .where('id IN (:ids)', { ids: ids })
            .execute();
    }
    async deleteOne(id) {
        return await this.multiCurrencyRepository.delete(id);
    }
};
MultiCurrencyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(multi_currency_entity_1.MultiCurrency)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MultiCurrencyService);
exports.MultiCurrencyService = MultiCurrencyService;
//# sourceMappingURL=multi-currency.service.js.map