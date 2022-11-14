/// <reference types="multer" />
import { ServiceCategoryDto } from './dto/service-categories.dto';
import { ServiceCategory } from './entities/service-categories.entity';
import { ServiceCategoriesService } from './service-categories.service';
export declare class ServiceCategoriesController {
    private readonly serviceCategoriesService;
    constructor(serviceCategoriesService: ServiceCategoriesService);
    getAllServiceCategories(): Promise<ServiceCategory[]>;
    createServiceCategory(category: ServiceCategoryDto, icon: Express.Multer.File): Promise<import("typeorm").InsertResult>;
    updateServiceCategory(id: number, updInfo: ServiceCategoryDto): Promise<{
        message: string;
    }>;
    deleteServiceCategory(id: number): Promise<{
        message: string;
    }>;
}
