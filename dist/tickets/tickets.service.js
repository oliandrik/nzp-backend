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
exports.TicketsService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
let TicketsService = class TicketsService {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    async findAll() {
        return await this.ticketRepository.find({ loadRelationIds: true });
    }
    async byId(id) {
        const ticket = await this.ticketRepository.findOne({
            where: { id: id },
        });
        if (!ticket) {
            throw new common_1.HttpException('Forbidden', common_1.HttpStatus.FORBIDDEN);
        }
        return ticket;
    }
    async bySubject(subject) {
        return await this.ticketRepository.find({
            where: {
                subject: (0, typeorm_1.Like)(`%${subject}%`),
            },
            loadRelationIds: true,
        });
    }
    async byClient(client) {
        return await this.ticketRepository.find({
            where: {
                client: client,
            },
            loadRelationIds: true,
        });
    }
    async create(body) {
        return (await this.ticketRepository.insert(Object.assign(Object.assign({}, body), { client: { id: body.client_id }, user: { id: body.user_id }, created_at: new Date(), updated_at: new Date() })),
            { message: 'Ticket was successfully created' });
    }
    async update(id, body) {
        await this.byId(id);
        return (await this.ticketRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() })),
            { message: 'Ticket was updated' });
    }
    async deleteOne(id) {
        await this.byId(id);
        return (await this.ticketRepository.delete(id),
            { message: 'Ticket was successfully deleted' });
    }
    async bulkDelete(ids) {
        return (await this.ticketRepository.delete(ids),
            { message: 'Tickets were successfully deleted' });
    }
};
TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(ticket_entity_1.Ticket)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TicketsService);
exports.TicketsService = TicketsService;
//# sourceMappingURL=tickets.service.js.map