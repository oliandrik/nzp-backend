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
exports.ServiceCategory = void 0;
const service_entity_1 = require("../../services/entities/service.entity");
const typeorm_1 = require("typeorm");
const service_categories_interfaces_1 = require("../interfaces/service-categories.interfaces");
let ServiceCategory = class ServiceCategory {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], ServiceCategory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], ServiceCategory.prototype, "category_name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_categories_interfaces_1.ECategoryPosition,
    }),
    __metadata("design:type", Number)
], ServiceCategory.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: service_categories_interfaces_1.ECategoryStatus,
    }),
    __metadata("design:type", Number)
], ServiceCategory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], ServiceCategory.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ServiceCategory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ServiceCategory.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.Service, (service) => service.category),
    __metadata("design:type", Array)
], ServiceCategory.prototype, "services", void 0);
ServiceCategory = __decorate([
    (0, typeorm_1.Entity)({ name: 'service_categories' })
], ServiceCategory);
exports.ServiceCategory = ServiceCategory;
//# sourceMappingURL=service-categories.entity.js.map