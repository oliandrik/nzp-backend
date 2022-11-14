"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentToClientModule = void 0;
const common_1 = require("@nestjs/common");
const payment_to_client_service_1 = require("./payment-to-client.service");
const payment_to_client_controller_1 = require("./payment-to-client.controller");
let PaymentToClientModule = class PaymentToClientModule {
};
PaymentToClientModule = __decorate([
    (0, common_1.Module)({
        controllers: [payment_to_client_controller_1.PaymentToClientController],
        providers: [payment_to_client_service_1.PaymentToClientService]
    })
], PaymentToClientModule);
exports.PaymentToClientModule = PaymentToClientModule;
//# sourceMappingURL=payment-to-client.module.js.map