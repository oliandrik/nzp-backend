/// <reference types="multer" />
import { Response } from 'express';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getClients(): Promise<Client[]>;
    getAvatar(avatar: any, res: Response): Promise<void>;
    getClientsInfoByASC(param: any): Promise<Client[]>;
    getClientsInfoByDESC(param: any): Promise<Client[]>;
    getClientsByStatus(param: any): Promise<Client[]>;
    exportClientsFile(body: any): Promise<import("../export-files/entities/file.entity").ExportFile>;
    changeGender(clientDto: ClientDto, id: number): Promise<import("typeorm").UpdateResult>;
    changeAvatar(file: Express.Multer.File, id: any, user: any): Promise<{
        message: string;
    }>;
    setPassword(id: any, body: any): Promise<{
        message: string;
    }>;
    discount(id: any, body: any): Promise<{
        message: string;
    }>;
    changeStatus(id: any, body: any): Promise<{
        message: string;
    }>;
}
