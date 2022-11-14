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
exports.PaymentMethodsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const payment_method_entity_1 = require("./entities/payment-method.entity");
let PaymentMethodsService = class PaymentMethodsService {
    constructor(paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }
    async byId(id) {
        const paymentMethodId = await this.paymentMethodRepository.findOne({
            where: { id: id },
        });
        if (!paymentMethodId) {
            throw new common_1.HttpException("This payment method isn't exists", common_1.HttpStatus.NOT_FOUND);
        }
        return paymentMethodId;
    }
    async getAllPaymentMethods() {
        return await this.paymentMethodRepository.query(`SELECT * FROM payment_methods`);
    }
    async createPaymentMethod(body) {
        const newPaymentMethod = await this.paymentMethodRepository.create({
            method_name: body.method_name,
            minimal_payment: body.minimal_payment,
            maximal_payment: body.maximal_payment,
            is_allowed_for_new_users: body.is_allowed_for_new_users,
            instruction: body.instruction,
            created_at: new Date(),
            updated_at: new Date(),
        });
        return await this.paymentMethodRepository.save(newPaymentMethod);
    }
    async updateService(id, body) {
        await this.byId(id);
        return (await this.paymentMethodRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() })),
            { message: 'Payment method was updated' });
    }
    async changeAccessibilityToNewUsers(id, param) {
        await this.byId(id);
        return (await this.paymentMethodRepository.update({ id }, { is_allowed_for_new_users: param, updated_at: new Date() }),
            { message: 'Payment method for new users was updated' });
    }
    async deletePaymentMethod(id) {
        await this.byId(id);
        return await this.paymentMethodRepository.query(`DELETE FROM payment_methods WHERE id = "${id}"`);
    }
};
PaymentMethodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(payment_method_entity_1.PaymentMethod)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PaymentMethodsService);
exports.PaymentMethodsService = PaymentMethodsService;
//# sourceMappingURL=payment-methods.service.js.map