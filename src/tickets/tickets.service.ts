import { Client } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/services/clients.service';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { GatewayGateway } from './gateway/gateway.gateway';
import { MessagesService } from './messages/messages.service';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly messageService: MessagesService,
    private readonly clientService: ClientsService,
    private readonly server: GatewayGateway,
  ) {}

  async findAll() {
    return await this.ticketRepository.find({ loadRelationIds: true });
  }

  async getConversations() {
    return this.ticketRepository.createQueryBuilder('ticket').getMany();
  }

  async getConversation(id) {
    const ticket = await this.ticketRepository.findOne({
      relations: {
        messages: true,
      },
      select: {
        messages: {
          id: true,
          content: true,
          created_at: true,
          client: {
            email: true,
          },
        },
        order: {
          id: true,
        },
      },
      where: {
        id: id,
      },
    });
    return ticket;
  }

  async byId(id) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: id },
    });

    if (!ticket) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return ticket;
  }

  async create(body) {
    const findByOrder = await this.ticketRepository.findOne({
      where: { order: { id: body.orderId } as Order },
    });

    let ticket;
    if (!findByOrder) {
      ticket = await this.ticketRepository.insert({
        order: { id: body.orderId } as Order,
        created_at: new Date(),
      });
    }

    const message = {
      content: body.obj.message,
      client: { id: body.clientId } as Client,
      user: { id: body.userId } as User,
      ticket: findByOrder ? findByOrder.id : ticket.raw.insertId,
      created_at: new Date(),
    };

    await this.messageService.getMessageRepository().insert(message);

    this.server.server.emit('createMessage', message);
    return ticket;
  }

  async deleteOne(id: number) {
    await this.byId(id);

    return (
      await this.ticketRepository.delete(id),
      { message: 'Ticket was successfully deleted' }
    );
  }

  async bulkDelete(ids: []) {
    return (
      await this.ticketRepository.delete(ids),
      { message: 'Tickets were successfully deleted' }
    );
  }
}
