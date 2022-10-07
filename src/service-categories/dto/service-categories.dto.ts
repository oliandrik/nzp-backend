import {
  CategoryPosition,
  CategoryStatus,
} from '../entity/service-categories.entity';

export class ServiceCategoryDto {
  id: bigint;
  category_name: string;
  position: CategoryPosition;
  status: CategoryStatus;
}
