import { EOrderStatus } from '../interfaces/order.interfaces';

export class OrderDto {
  id: number;
  client: string; //change it
  charge: number;
  link: string;
  start_count: number;
  quantity: number;
  service: string; //change it
  status: EOrderStatus;
  remains: number;
  created_at: Date;
}
