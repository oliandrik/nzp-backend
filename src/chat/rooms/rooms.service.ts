import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomDto } from '../dto/room.dto';
import { Room } from '../entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  // create room
  async createRoom(room: RoomDto) {
    return await this.roomRepository.insert({
      ...room,
      created_at: new Date(),
    });
  }

  // get room
  async getRoom(roomId: number): Promise<RoomDto> {
    return this.roomRepository.findOne({ where: { id: roomId } });
  }

  async getRooms() {
    return await this.roomRepository.find();
  }
}
