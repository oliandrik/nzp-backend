import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  messages: Message[] = [];
  clientToUser = {};

  identify(name, clientId) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId) {
    return this.clientToUser[clientId];
  }

  create(createMessageDto: CreateMessageDto) {
    return this.messageRepository.insert({
      ...createMessageDto,
      created_at: new Date(),
    });
  }

  findAll() {
    return this.messages;
  }
}
