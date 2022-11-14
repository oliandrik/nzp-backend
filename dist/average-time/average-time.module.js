"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AverageTimeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const average_time_controller_1 = require("./average-time.controller");
const average_time_service_1 = require("./average-time.service");
const average_time_entity_1 = require("./entities/average-time.entity");
let AverageTimeModule = class AverageTimeModule {
};
AverageTimeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([average_time_entity_1.AverageTime])],
        controllers: [average_time_controller_1.AverageTimeController],
        providers: [average_time_service_1.AverageTimeService],
        exports: [average_time_service_1.AverageTimeService],
    })
], AverageTimeModule);
exports.AverageTimeModule = AverageTimeModule;
//# sourceMappingURL=average-time.module.js.map