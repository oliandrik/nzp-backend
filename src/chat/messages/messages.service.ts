import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from '../entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly messageRepository: Repository<ChatMessage>,
  ) {}

  async create(message) {
    return this.messageRepository.insert({
      ...message,
      created_at: new Date(),
    });
  }
}
