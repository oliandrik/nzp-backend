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
exports.ClientsController = void 0;
const multer_1 = require("multer");
const currentUser_decorator_1 = require("../auth/decorators/currentUser.decorator");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const clients_service_1 = require("./clients.service");
const client_dto_1 = require("./dto/client.dto");
let ClientsController = class ClientsController {
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    async getClients() {
        return await this.clientsService.getClients();
    }
    async getAvatar(avatar, res) {
        res.sendFile(avatar, { root: './uploads/avatars' });
    }
    async getClientsInfoByASC(param) {
        return await this.clientsService.sortByASC(param.param);
    }
    async getClientsInfoByDESC(param) {
        return await this.clientsService.sortByDESC(param.param);
    }
    async getClientsByStatus(param) {
        return await this.clientsService.getByStatus(param.param);
    }
    async exportClientsFile(body) {
        return await this.clientsService.exportClientsFile(body);
    }
    async changeGender(clientDto, id) {
        return await this.clientsService.changeGender(clientDto, id);
    }
    async changeAvatar(file, id, user) {
        if (!file) {
            throw new common_1.BadRequestException('Error');
        }
        await this.clientsService.byId(user);
        return await this.clientsService.changeAvatar({ avatar: file.filename }, id.id);
    }
    async setPassword(id, body) {
        return await this.clientsService.setPassword(id, body.password);
    }
    async discount(id, body) {
        return await this.clientsService.discount(id, body.discount);
    }
    async changeStatus(id, body) {
        return await this.clientsService.changeStatus(id, body.status);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getClients", null);
__decorate([
    (0, common_1.Get)('/avatar/:avatar'),
    __param(0, (0, common_1.Param)('avatar')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getAvatar", null);
__decorate([
    (0, common_1.Get)('asc/:param'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getClientsInfoByASC", null);
__decorate([
    (0, common_1.Get)('desc/:param'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getClientsInfoByDESC", null);
__decorate([
    (0, common_1.Get)('status/:param'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "getClientsByStatus", null);
__decorate([
    (0, common_1.Post)('files'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "exportClientsFile", null);
__decorate([
    (0, common_1.Put)(':id/change-gender'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.ClientDto, Number]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "changeGender", null);
__decorate([
    (0, common_1.Put)(':id/change-avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                const fileExtension = file.originalname.split('.');
                const newFilename = name.split(' ').join('_') +
                    '_' +
                    Date.now() +
                    '.' +
                    fileExtension[fileExtension.length - 1];
                cb(null, newFilename);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, currentUser_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "changeAvatar", null);
__decorate([
    (0, common_1.Put)(':id/set-password'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "setPassword", null);
__decorate([
    (0, common_1.Put)(':id/discount'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "discount", null);
__decorate([
    (0, common_1.Put)(':id/change-status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ClientsController.prototype, "changeStatus", null);
ClientsController = __decorate([
    (0, common_1.Controller)('clients'),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
exports.ClientsController = ClientsController;
//# sourceMappingURL=clients.controller.js.map