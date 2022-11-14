"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const updates_entity_1 = require("./entities/updates.entity");
const updates_controller_1 = require("./updates.controller");
const updates_service_1 = require("./updates.service");
let UpdatesModule = class UpdatesModule {
};
UpdatesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([updates_entity_1.Update])],
        controllers: [updates_controller_1.UpdatesController],
        providers: [updates_service_1.UpdatesService],
        exports: [updates_service_1.UpdatesService],
    })
], UpdatesModule);
exports.UpdatesModule = UpdatesModule;
//# sourceMappingURL=updates.module.js.map