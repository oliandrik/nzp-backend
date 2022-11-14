import { ExportFilesService } from 'src/export-files/export-files.service';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
export declare class ClientsService {
    private readonly clientRepository;
    private readonly exportFileService;
    constructor(clientRepository: Repository<Client>, exportFileService: ExportFilesService);
    sortByASC(param: any): Promise<Client[]>;
    sortByDESC(param: any): Promise<Client[]>;
    getByStatus(param: string): Promise<Client[]>;
    byEmail(data: any): Promise<Client>;
    byId(id: any): Promise<Client>;
    getClients(): Promise<Client[]>;
    changeGender(data: any, id: any): Promise<import("typeorm").UpdateResult>;
    changeAvatar(avatar: any, id: any): Promise<{
        message: string;
    }>;
    exportClientsFile(body: any): Promise<import("../export-files/entities/file.entity").ExportFile>;
    setPassword(id: any, password: any): Promise<{
        message: string;
    }>;
    discount(id: any, discount: any): Promise<{
        message: string;
    }>;
    changeStatus(id: any, status: string): Promise<{
        message: string;
    }>;
}
