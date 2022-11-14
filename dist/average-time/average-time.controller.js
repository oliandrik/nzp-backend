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
exports.AverageTimeController = void 0;
const common_1 = require("@nestjs/common");
const average_time_service_1 = require("./average-time.service");
let AverageTimeController = class AverageTimeController {
    constructor(averageTimeService) {
        this.averageTimeService = averageTimeService;
    }
    async updateDisplayOn(id, body) {
        return await this.averageTimeService.update(id, body);
    }
};
__decorate([
    (0, common_1.Put)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AverageTimeController.prototype, "updateDisplayOn", null);
AverageTimeController = __decorate([
    (0, common_1.Controller)('average-time'),
    __metadata("design:paramtypes", [average_time_service_1.AverageTimeService])
], AverageTimeController);
exports.AverageTimeController = AverageTimeController;
//# sourceMappingURL=average-time.controller.js.map