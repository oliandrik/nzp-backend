import { Client } from 'src/clients/entities/client.entity';

import { EOrderMode, EOrderStatus } from '../interfaces/order.interfaces';

export class OrderDto {
  id: number;
  client: Client;
  charge: number;
  link: string;
  start_count: number;
  quantity: number;
  service: EOrderMode;
  status: EOrderStatus;
  remains: number;
  mode: EOrderMode;
}
