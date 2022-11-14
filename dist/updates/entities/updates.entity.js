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
exports.Update = void 0;
const service_entity_1 = require("../../services/entities/service.entity");
const service_interfaces_1 = require("../../services/interfaces/service.interfaces");
const typeorm_1 = require("typeorm");
let Update = class Update {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Update.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service),
    __metadata("design:type", service_entity_1.Service)
], Update.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceStatus }),
    __metadata("design:type", Number)
], Update.prototype, "new_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: service_interfaces_1.EServiceStatus }),
    __metadata("design:type", Number)
], Update.prototype, "old_status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Update.prototype, "old_rate_per", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Update.prototype, "new_rate_per", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Update.prototype, "mark", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Update.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Update.prototype, "updated_at", void 0);
Update = __decorate([
    (0, typeorm_1.Entity)({ name: 'updates' })
], Update);
exports.Update = Update;
//# sourceMappingURL=updates.entity.js.map