"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportFilesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const file_entity_1 = require("./entities/file.entity");
const export_files_controller_1 = require("./export-files.controller");
const export_files_service_1 = require("./export-files.service");
let ExportFilesModule = class ExportFilesModule {
};
ExportFilesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.ExportFile])],
        controllers: [export_files_controller_1.ExportFilesController],
        providers: [export_files_service_1.ExportFilesService],
        exports: [export_files_service_1.ExportFilesService],
    })
], ExportFilesModule);
exports.ExportFilesModule = ExportFilesModule;
//# sourceMappingURL=export-files.module.js.map