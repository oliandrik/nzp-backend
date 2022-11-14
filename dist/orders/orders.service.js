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
exports.OrdersService = void 0;
const export_files_service_1 = require("../export-files/export-files.service");
const typeorm_1 = require("typeorm");
const xml_js_1 = require("xml-js");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const order_entity_1 = require("./entities/order.entity");
let OrdersService = class OrdersService {
    constructor(orderRepository, exportFileService) {
        this.orderRepository = orderRepository;
        this.exportFileService = exportFileService;
    }
    async findAll() {
        return await this.orderRepository.find({
            relations: {
                client: true,
                service: true,
            },
            select: {
                client: {
                    username: true,
                },
            },
        });
    }
    async byId(id) {
        const order = await this.orderRepository.find({
            loadRelationIds: true,
            where: { id: id },
        });
        if (!order) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return order;
    }
    async byLink(link) {
        return await this.orderRepository.find({
            where: {
                link: (0, typeorm_1.Like)(`%${link}%`),
            },
            loadRelationIds: true,
        });
    }
    async byUsername(username) {
        return await this.orderRepository.find({
            where: {
                client: (0, typeorm_1.Like)(`%${username}%`),
            },
            loadRelationIds: true,
        });
    }
    async byServiceId(serviceId) {
        return await this.orderRepository.find({
            where: {
                service: (0, typeorm_1.Like)(`%${serviceId}%`),
            },
            loadRelationIds: true,
        });
    }
    async create(body) {
        return await this.orderRepository.insert(Object.assign(Object.assign({ client: { id: body.clientId }, service: { id: body.serviceId } }, body), { mode: 1, created_at: new Date(), updated_at: new Date() }));
    }
    async update(id, body) {
        return await this.orderRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
    }
    async deleteOne(id) {
        await this.byId(id);
        return (await this.orderRepository.delete(id),
            { message: 'Order was successfully deleted' });
    }
    async bulkDelete(ids) {
        return (await this.orderRepository.delete(ids),
            { message: 'Orders were successfully deleted' });
    }
    async exportOrdersFile(body) {
        const fs = require('fs');
        const csvjson = require('csvjson');
        const dir = './src/fileToExport';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const res = await this.orderRepository.find({
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
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        export_files_service_1.ExportFilesService])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map