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
exports.PaymentMethod = void 0;
const typeorm_1 = require("typeorm");
const payment_method_interfaces_1 = require("../interfaces/payment-method.interfaces");
let PaymentMethod = class PaymentMethod {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PaymentMethod.prototype, "method_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "minimal_payment", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, default: null }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "maximal_payment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: payment_method_interfaces_1.EIsAllowedForNewUser,
        default: payment_method_interfaces_1.EIsAllowedForNewUser.ALLOWED,
    }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "is_allowed_for_new_users", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], PaymentMethod.prototype, "instruction", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "updated_at", void 0);
PaymentMethod = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment_methods' })
], PaymentMethod);
exports.PaymentMethod = PaymentMethod;
//# sourceMappingURL=payment-method.entity.js.map