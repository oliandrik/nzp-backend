"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bonuses_controller_1 = require("./bonuses.controller");
const bonuses_service_1 = require("./bonuses.service");
const bonus_entity_1 = require("./entities/bonus.entity");
let BonusesModule = class BonusesModule {
};
BonusesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bonus_entity_1.Bonus])],
        controllers: [bonuses_controller_1.BonusesController],
        providers: [bonuses_service_1.BonusesService],
        exports: [bonuses_service_1.BonusesService],
    })
], BonusesModule);
exports.BonusesModule = BonusesModule;
//# sourceMappingURL=bonuses.module.js.map