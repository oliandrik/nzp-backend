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
exports.ServiceCategoriesController = void 0;
const multer_1 = require("multer");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const service_categories_dto_1 = require("./dto/service-categories.dto");
const service_categories_service_1 = require("./service-categories.service");
let ServiceCategoriesController = class ServiceCategoriesController {
    constructor(serviceCategoriesService) {
        this.serviceCategoriesService = serviceCategoriesService;
    }
    async getAllServiceCategories() {
        return await this.serviceCategoriesService.getAllServiceCategories();
    }
    async createServiceCategory(category, icon) {
        let checkIcon;
        if (icon == undefined) {
            checkIcon = null;
        }
        else {
            checkIcon = icon.filename;
        }
        return await this.serviceCategoriesService.createServiceCategory(category, checkIcon);
    }
    async updateServiceCategory(id, updInfo) {
        return await this.serviceCategoriesService.updateServiceCategory(id, updInfo);
    }
    async deleteServiceCategory(id) {
        return await this.serviceCategoriesService.deleteServiceCategory(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "getAllServiceCategories", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('icon', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/categoryIcons',
            filename: (req, icon, cb) => {
                const name = icon.originalname.split('.')[0];
                const fileExtension = icon.originalname.split('.');
                const newFilename = name.split(' ').join('_') +
                    '_' +
                    Date.now() +
                    '.' +
                    fileExtension[fileExtension.length - 1];
                cb(null, newFilename);
            },
        }),
    })),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_categories_dto_1.ServiceCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "createServiceCategory", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, service_categories_dto_1.ServiceCategoryDto]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "updateServiceCategory", null);
__decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServiceCategoriesController.prototype, "deleteServiceCategory", null);
ServiceCategoriesController = __decorate([
    (0, common_1.Controller)('service-categories'),
    __metadata("design:paramtypes", [service_categories_service_1.ServiceCategoriesService])
], ServiceCategoriesController);
exports.ServiceCategoriesController = ServiceCategoriesController;
//# sourceMappingURL=service-categories.controller.js.map