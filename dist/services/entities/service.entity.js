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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const provider_entity_1 = require("../../providers/entities/provider.entity");
const service_categories_entity_1 = require("../../service-categories/entities/service-categories.entity");
const typeorm_1 = require("typeorm");
const service_interfaces_1 = require("../interfaces/service.interfaces");
let Service = class Service {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Service.prototype, "service_name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_categories_entity_1.ServiceCategory),
    __metadata("design:type", service_categories_entity_1.ServiceCategory)
], Service.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceStatus }),
    __metadata("design:type", Number)
], Service.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceType }),
    __metadata("design:type", Number)
], Service.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceMode }),
    __metadata("design:type", Number)
], Service.prototype, "mode", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_entity_1.Provider),
    __metadata("design:type", provider_entity_1.Provider)
], Service.prototype, "provider", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceDripFeed }),
    __metadata("design:type", Number)
], Service.prototype, "drip_feed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceCancel }),
    __metadata("design:type", Number)
], Service.prototype, "cancel", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "rate_per", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "min_order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "max_order", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceLinkDuplicate }),
    __metadata("design:type", Number)
], Service.prototype, "link_duplicate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "increment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "overflow", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Service.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Service.prototype, "updated_at", void 0);
Service = __decorate([
    (0, typeorm_1.Entity)({ name: 'services' })
], Service);
exports.Service = Service;
//# sourceMappingURL=service.entity.js.map