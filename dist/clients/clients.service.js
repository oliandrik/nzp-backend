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
exports.ClientsService = void 0;
const bcrypt = require("bcrypt");
const export_files_service_1 = require("../export-files/export-files.service");
const typeorm_1 = require("typeorm");
const xml_js_1 = require("xml-js");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const client_entity_1 = require("./entities/client.entity");
const client_interfaces_1 = require("./interfaces/client.interfaces");
let ClientsService = class ClientsService {
    constructor(clientRepository, exportFileService) {
        this.clientRepository = clientRepository;
        this.exportFileService = exportFileService;
    }
    async sortByASC(param) {
        return await this.clientRepository.find({ order: { [param]: 'ASC' } });
    }
    async sortByDESC(param) {
        return await this.clientRepository.find({ order: { [param]: 'DESC' } });
    }
    async getByStatus(param) {
        return await this.clientRepository.find({
            where: { status: client_interfaces_1.EClientStatus[param.toUpperCase()] },
        });
    }
    async byEmail(data) {
        const client = await this.clientRepository.findOne({
            where: { email: data },
        });
        if (!client) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return client;
    }
    async byId(id) {
        const client = await this.clientRepository.findOne({
            where: { id: id.id },
        });
        if (!client) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return client;
    }
    async getClients() {
        return await this.clientRepository.find();
    }
    async changeGender(data, id) {
        await this.byId(id);
        return await this.clientRepository.update({ id }, { gender: data.gender, updated_at: new Date() });
    }
    async changeAvatar(avatar, id) {
        const findUser = await this.byId(id);
        const fs = require('fs');
        if (findUser.avatar !== null) {
            fs.unlink(`./uploads/avatars/${findUser.avatar}`, function (err) {
                if (err) {
                    throw err;
                }
                else {
                    console.log('Successfully deleted the file.');
                }
            });
            delete findUser.avatar;
        }
        return (await this.clientRepository.update({ id }, { avatar: avatar.avatar, updated_at: new Date() }),
            { message: 'Avatar  was successfully updated' });
    }
    async exportClientsFile(body) {
        const fs = require('fs');
        const csvjson = require('csvjson');
        const dir = './src/fileToExport';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const res = await this.clientRepository.find({
            where: {
                status: (0, typeorm_1.In)(body.status),
                created_at: (0, typeorm_1.Between)(body.from, body.to),
            },
        });
        const writeStream = fs.createWriteStream(`${dir}/file_clients_${+new Date()}.${body.format}`);
        const newFile = await this.exportFileService.getRepository().create({
            filename: `file_clients_${+new Date()}.${body.format}`,
            export_for: 'clients',
            created_at: new Date(),
        });
        switch (body.format) {
            case 'csv':
                writeStream.write(csvjson.toCSV(res, {
                    headers: 'key',
                }));
                break;
            case 'xml':
                writeStream.write((0, xml_js_1.json2xml)(JSON.stringify(res), { compact: true, spaces: 4 }));
            default:
                writeStream.write(`${JSON.stringify(res)}`);
                break;
        }
        writeStream.end();
        return await this.exportFileService.getRepository().save(newFile);
    }
    async setPassword(id, password) {
        await this.byId(id);
        const hashedPassword = await bcrypt.hash(password, 10);
        return (await this.clientRepository.update({ id }, { password: hashedPassword, updated_at: new Date() }),
            { message: 'Password  was successfully updated' });
    }
    async discount(id, discount) {
        await this.byId(id);
        return (await this.clientRepository.update({ id }, { discount, updated_at: new Date() }),
            { message: 'Discount  was successfully updated' });
    }
    async changeStatus(id, status) {
        await this.byId(id);
        if (!client_interfaces_1.EClientStatus[status.toUpperCase()]) {
            throw new common_1.BadRequestException('Invalid status');
        }
        return (await this.clientRepository.update({ id }, { status: client_interfaces_1.EClientStatus[status.toUpperCase()], updated_at: new Date() }),
            { message: 'Status  was successfully updated' });
    }
};
ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        export_files_service_1.ExportFilesService])
], ClientsService);
exports.ClientsService = ClientsService;
//# sourceMappingURL=clients.service.js.map