"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_categories_entity_1 = require("./entities/service-categories.entity");
const service_categories_controller_1 = require("./service-categories.controller");
const service_categories_service_1 = require("./service-categories.service");
let ServiceCategoriesModule = class ServiceCategoriesModule {
};
ServiceCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([service_categories_entity_1.ServiceCategory])],
        controllers: [service_categories_controller_1.ServiceCategoriesController],
        providers: [service_categories_service_1.ServiceCategoriesService],
        exports: [service_categories_service_1.ServiceCategoriesService],
    })
], ServiceCategoriesModule);
exports.ServiceCategoriesModule = ServiceCategoriesModule;
//# sourceMappingURL=service-categories.module.js.map