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
exports.AverageTime = void 0;
const typeorm_1 = require("typeorm");
const average_time_interfaces_1 = require("../interfaces/average-time.interfaces");
let AverageTime = class AverageTime {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", Number)
], AverageTime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AverageTime.prototype, "display_on", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: average_time_interfaces_1.EActivationAverageTime }),
    __metadata("design:type", Number)
], AverageTime.prototype, "activation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], AverageTime.prototype, "updated_at", void 0);
AverageTime = __decorate([
    (0, typeorm_1.Entity)({ name: 'average_time' })
], AverageTime);
exports.AverageTime = AverageTime;
//# sourceMappingURL=average-time.entity.js.map