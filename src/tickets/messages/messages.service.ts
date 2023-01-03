import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  getMessageRepository() {
    return this.messageRepository;
  }

  async getMessages(id) {
    return await this.messageRepository.find({
      relations: ['client', 'user', 'ticket'],
      select: {
        client: {
          id: true,
          username: true,
          email: true,
        },
      },
      where: {
        ticket: {
          id: id,
        },
      },
      order: { created_at: 'DESC' },
    });
  }
}
