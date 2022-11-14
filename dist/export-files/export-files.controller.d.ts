import { ExportFilesService } from './export-files.service';
export declare class ExportFilesController {
    private readonly exportFilesService;
    constructor(exportFilesService: ExportFilesService);
    getAllFiles(): Promise<import("./entities/file.entity").ExportFile[]>;
    getByParam(param: string): Promise<import("./entities/file.entity").ExportFile[]>;
    bulkDelete(body: any): Promise<{
        message: string;
    }>;
    deleteFile(id: any): Promise<{
        message: string;
    }>;
}
