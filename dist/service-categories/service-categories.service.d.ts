import { Repository } from 'typeorm';
import { ServiceCategoryDto } from './dto/service-categories.dto';
import { ServiceCategory } from './entities/service-categories.entity';
export declare class ServiceCategoriesService {
    private readonly serviceCategoryRepository;
    constructor(serviceCategoryRepository: Repository<ServiceCategory>);
    getAllServiceCategories(): Promise<ServiceCategory[]>;
    byName(categoryName: string): Promise<ServiceCategory>;
    byId(id: any): Promise<ServiceCategory>;
    createServiceCategory(category: ServiceCategoryDto, icon: any): Promise<import("typeorm").InsertResult>;
    updateServiceCategory(id: any, updInfo: any): Promise<{
        message: string;
    }>;
    deleteServiceCategory(id: any): Promise<{
        message: string;
    }>;
}
