import {
  CategoryPosition,
  CategoryStatus,
} from '../entities/service-categories.entity';

export class ServiceCategoryDto {
  id: bigint;
  category_name: string;
  position: CategoryPosition;
  icon: string;
  status: CategoryStatus;
}
