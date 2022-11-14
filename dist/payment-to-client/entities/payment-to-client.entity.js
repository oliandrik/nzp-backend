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
var PaymentMethod_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethod = void 0;
const client_entity_1 = require("../../clients/entities/client.entity");
const typeorm_1 = require("typeorm");
let PaymentMethod = PaymentMethod_1 = class PaymentMethod {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], PaymentMethod.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.Index)(),
    __metadata("design:type", client_entity_1.Client)
], PaymentMethod.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PaymentMethod_1),
    (0, typeorm_1.Index)(),
    __metadata("design:type", PaymentMethod)
], PaymentMethod.prototype, "payment_method", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PaymentMethod.prototype, "updated_at", void 0);
PaymentMethod = PaymentMethod_1 = __decorate([
    (0, typeorm_1.Entity)({ name: 'payment_to_client' })
], PaymentMethod);
exports.PaymentMethod = PaymentMethod;
//# sourceMappingURL=payment-to-client.entity.js.map