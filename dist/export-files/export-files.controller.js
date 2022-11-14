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
exports.ExportFilesController = void 0;
const common_1 = require("@nestjs/common");
const export_files_service_1 = require("./export-files.service");
let ExportFilesController = class ExportFilesController {
    constructor(exportFilesService) {
        this.exportFilesService = exportFilesService;
    }
    async getAllFiles() {
        return await this.exportFilesService.getAllFiles();
    }
    async getByParam(param) {
        console.log(param, 'param');
        return await this.exportFilesService.getBy(param);
    }
    async bulkDelete(body) {
        return await this.exportFilesService.bulkDelete(body.ids);
    }
    async deleteFile(id) {
        return await this.exportFilesService.deleteFile(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExportFilesController.prototype, "getAllFiles", null);
__decorate([
    (0, common_1.Get)('get-by/:param'),
    __param(0, (0, common_1.Param)('param')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExportFilesController.prototype, "getByParam", null);
__decorate([
    (0, common_1.Delete)('bulk-delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExportFilesController.prototype, "bulkDelete", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExportFilesController.prototype, "deleteFile", null);
ExportFilesController = __decorate([
    (0, common_1.Controller)('export-files'),
    __metadata("design:paramtypes", [export_files_service_1.ExportFilesService])
], ExportFilesController);
exports.ExportFilesController = ExportFilesController;
//# sourceMappingURL=export-files.controller.js.map