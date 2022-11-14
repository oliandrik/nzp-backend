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
exports.GeneralSetting = void 0;
const typeorm_1 = require("typeorm");
const general_settings_interfaces_1 = require("../interfaces/general-settings.interfaces");
let GeneralSetting = class GeneralSetting {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], GeneralSetting.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], GeneralSetting.prototype, "favicon", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GeneralSetting.prototype, "panel_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GeneralSetting.prototype, "timezone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "currency_format", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "rates_rounding", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], GeneralSetting.prototype, "service_name_format", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_settings_interfaces_1.ETicketSystem }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "ticket_system", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "max_pending_tickets_per_user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_settings_interfaces_1.ESignupPage }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "signup_page", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_settings_interfaces_1.EEmailConfirmation }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "email_confirmation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_settings_interfaces_1.ETermsCheckbox }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "terms_checkbox", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: general_settings_interfaces_1.EResetPassword }),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "reset_password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], GeneralSetting.prototype, "minimum_dripfeed_interval", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], GeneralSetting.prototype, "custom_header_code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], GeneralSetting.prototype, "custom_footer_code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], GeneralSetting.prototype, "updated_at", void 0);
GeneralSetting = __decorate([
    (0, typeorm_1.Entity)({ name: 'general_settings' })
], GeneralSetting);
exports.GeneralSetting = GeneralSetting;
//# sourceMappingURL=general-settings.entity.js.map