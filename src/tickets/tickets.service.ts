import { Client } from 'src/clients/entities/client.entity';
import { User } from 'src/users/entities/user.entity';
import { Like, Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async findAll() {
    return await this.ticketRepository.find({ loadRelationIds: true });
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

  async bySubject(subject) {
    return await this.ticketRepository.find({
      where: {
        subject: Like(`%${subject}%`),
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
    return (
      await this.ticketRepository.insert({
        ...body,
        client: { id: body.client_id } as Client,
        user: { id: body.user_id } as User,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      { message: 'Ticket was successfully created' }
    );
  }

  async update(id, body) {
    await this.byId(id);

    return (
      await this.ticketRepository.update(
        { id },
        { ...body, updated_at: new Date() },
      ),
      { message: 'Ticket was updated' }
    );
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
