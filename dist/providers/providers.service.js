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
exports.ProvidersService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const provider_entity_1 = require("./entities/provider.entity");
let ProvidersService = class ProvidersService {
    constructor(providerRepository) {
        this.providerRepository = providerRepository;
    }
    async findAll() {
        return await this.providerRepository.find();
    }
    async byId(id) {
        const provider = await this.providerRepository.findOne({
            where: { id: id },
        });
        if (!provider) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return provider;
    }
    async create(body) {
        return await this.providerRepository.insert(Object.assign(Object.assign({}, body), { created_at: new Date(), updated_at: new Date() }));
    }
    async update(id, body) {
        return (await this.providerRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() })),
            { message: 'Provider was successfully updated' });
    }
    async deleteOne(id) {
        return (await this.providerRepository.delete(id),
            { message: 'Provider was successfully deleted' });
    }
    async bulkDelete(ids) {
        return (await this.providerRepository.delete(ids),
            { message: 'Providers were successfully deleted' });
    }
};
ProvidersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(provider_entity_1.Provider)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProvidersService);
exports.ProvidersService = ProvidersService;
//# sourceMappingURL=providers.service.js.map