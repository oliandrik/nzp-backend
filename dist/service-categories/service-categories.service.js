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
exports.ServiceCategoriesService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const service_categories_entity_1 = require("./entities/service-categories.entity");
const service_categories_interfaces_1 = require("./interfaces/service-categories.interfaces");
let ServiceCategoriesService = class ServiceCategoriesService {
    constructor(serviceCategoryRepository) {
        this.serviceCategoryRepository = serviceCategoryRepository;
    }
    async getAllServiceCategories() {
        return await this.serviceCategoryRepository.find();
    }
    async byName(categoryName) {
        const category = await this.serviceCategoryRepository.findOne({
            where: { category_name: categoryName },
        });
        if (category) {
            throw new common_1.BadRequestException('This category already exists');
        }
        return category;
    }
    async byId(id) {
        const categoryId = await this.serviceCategoryRepository.findOne({
            where: { id: id },
        });
        if (!categoryId) {
            throw new common_1.HttpException("This category isn't exists", common_1.HttpStatus.FORBIDDEN);
        }
        return categoryId;
    }
    async createServiceCategory(category, icon) {
        await this.byName(category.category_name);
        return await this.serviceCategoryRepository.insert({
            category_name: category.category_name,
            position: category.position,
            status: Math.random() < 0.5
                ? service_categories_interfaces_1.ECategoryStatus.ENABLED
                : service_categories_interfaces_1.ECategoryStatus.DISABLED,
            icon: icon,
            created_at: new Date(),
            updated_at: new Date(),
        });
    }
    async updateServiceCategory(id, updInfo) {
        await this.byId(id);
        return (await this.serviceCategoryRepository.update({ id }, Object.assign(Object.assign({}, updInfo), { updated_at: new Date() })),
            { message: 'Service category was updated' });
    }
    async deleteServiceCategory(id) {
        await this.byId(id);
        return (await this.serviceCategoryRepository.delete(id),
            { message: 'Service category was successfully deleted' });
    }
};
ServiceCategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(service_categories_entity_1.ServiceCategory)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ServiceCategoriesService);
exports.ServiceCategoriesService = ServiceCategoriesService;
//# sourceMappingURL=service-categories.service.js.map