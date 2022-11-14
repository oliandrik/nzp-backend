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
exports.ServicesService = void 0;
const updates_service_1 = require("../updates/updates.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const service_interfaces_1 = require("./interfaces/service.interfaces");
let ServicesService = class ServicesService {
    constructor(serviceRepository, updService) {
        this.serviceRepository = serviceRepository;
        this.updService = updService;
    }
    async findAll() {
        return await this.serviceRepository.find({
            loadRelationIds: true,
            relations: {
                provider: true,
            },
        });
    }
    async byId(id) {
        const categoryId = await this.serviceRepository.findOne({
            where: { id: id },
        });
        if (!categoryId) {
            throw new common_1.HttpException("This category isn't exists", common_1.HttpStatus.FORBIDDEN);
        }
        return categoryId;
    }
    async selectByStatus(status) {
        return await this.serviceRepository.find({
            where: { status: service_interfaces_1.EServiceStatus[status] },
        });
    }
    async selectByType(param) {
        return await this.serviceRepository.find({ where: { type: param } });
    }
    async getSelectedInfoProviders(providers) {
        return await this.serviceRepository.findBy({
            provider: (0, typeorm_1.In)(providers),
        });
    }
    async createService(body) {
        return await (this.serviceRepository.insert(Object.assign(Object.assign({}, body), { created_at: new Date(), updated_at: new Date() })),
            { message: 'created' });
    }
    async duplicateService(id) {
        const foundService = await this.byId(id);
        delete foundService.id;
        const newServiceCategory = this.serviceRepository.create(Object.assign({}, foundService));
        return await (this.serviceRepository.save(newServiceCategory),
            { message: 'duplicated' });
    }
    async updateService(id, service) {
        const foundService = await this.byId(id);
        const oldService = {
            service: { id: id },
            old_status: foundService.status,
            new_status: service.status,
            old_rate_per: foundService.rate_per,
            new_rate_per: service.rate_per !== undefined
                ? service.rate_per
                : foundService.rate_per,
        };
        if (oldService.old_status !== oldService.new_status &&
            oldService.old_rate_per == oldService.new_rate_per) {
            await this.updService.create(oldService, service_interfaces_1.EServiceStatus[oldService.new_status]);
        }
        if (oldService.old_status == oldService.new_status &&
            oldService.old_rate_per !== oldService.new_rate_per) {
            const mark = oldService.old_rate_per < oldService.new_rate_per
                ? 'increased'
                : 'decreased';
            await this.updService.create(oldService, mark);
        }
        return (await this.serviceRepository.update({ id }, Object.assign(Object.assign({}, service), { updated_at: new Date() })),
            { message: 'Service was updated' });
    }
    async changeStatus(id, status) {
        await this.byId(id);
        return (await this.serviceRepository.update({ id }, {
            status: service_interfaces_1.EServiceStatus[status.toUpperCase()],
            updated_at: new Date(),
        }),
            { message: 'Status was changed' });
    }
    async deleteSelectedService(id) {
        await this.byId(id);
        return (await this.serviceRepository.delete(id),
            { message: 'Service category was successfully deleted' });
    }
    async bulkDelete(ids) {
        return await this.serviceRepository.delete(ids);
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(service_entity_1.Service)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        updates_service_1.UpdatesService])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map