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
exports.Bonus = void 0;
const payment_method_entity_1 = require("../../payment-methods/entities/payment-method.entity");
const typeorm_1 = require("typeorm");
const bonus_interfaces_1 = require("../interfaces/bonus.interfaces");
let Bonus = class Bonus {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Bonus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bonus.prototype, "bonus_amount", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => payment_method_entity_1.PaymentMethod),
    __metadata("design:type", payment_method_entity_1.PaymentMethod)
], Bonus.prototype, "for_method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Bonus.prototype, "deposit_from", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: bonus_interfaces_1.EBonusStatus }),
    __metadata("design:type", Number)
], Bonus.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Bonus.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Bonus.prototype, "updated_at", void 0);
Bonus = __decorate([
    (0, typeorm_1.Entity)({ name: 'bonuses' })
], Bonus);
exports.Bonus = Bonus;
//# sourceMappingURL=bonus.entity.js.map