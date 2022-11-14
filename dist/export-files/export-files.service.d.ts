import { Repository } from 'typeorm';
import { ExportFile } from './entities/file.entity';
export declare class ExportFilesService {
    private readonly exportFileRepository;
    constructor(exportFileRepository: Repository<ExportFile>);
    getRepository(): Repository<ExportFile>;
    getAllFiles(): Promise<ExportFile[]>;
    getBy(param: any): Promise<ExportFile[]>;
    bulkDelete(ids: []): Promise<{
        message: string;
    }>;
    deleteFile(id: any): Promise<{
        message: string;
    }>;
}
