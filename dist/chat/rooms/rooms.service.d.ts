import { Repository } from 'typeorm';
import { RoomDto } from '../dto/room.dto';
import { Room } from '../entities/room.entity';
export declare class RoomsService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<Room>);
    createRoom(room: RoomDto): Promise<import("typeorm").InsertResult>;
    getRoom(roomId: number): Promise<RoomDto>;
    getRooms(): Promise<Room[]>;
}
