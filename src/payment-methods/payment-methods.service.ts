import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { EIsAllowedPaymentMenthod } from './interfaces/payment-method.interfaces';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async byId(id) {
    const paymentMethodId = await this.paymentMethodRepository.findOne({
      where: { id: id },
    });

    if (!paymentMethodId) {
      throw new HttpException(
        "This payment method isn't exists",
        HttpStatus.NOT_FOUND,
      );
    }

    return paymentMethodId;
  }

  async getAll() {
    return await this.paymentMethodRepository.find();
  }

  async create(body) {
    return (
      await this.paymentMethodRepository.insert({
        ...body,
        is_allowed: EIsAllowedPaymentMenthod.ALLOWED,
        created_at: new Date(),
        updated_at: new Date(),
      }),
      { message: 'Payment method was successfully created' }
    );
  }

  async updateService(id, body) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository.update(
        { id },
        { ...body, updated_at: new Date() },
      ),
      { message: 'Payment method was updated' }
    );
  }

  async visibility(id, visibility) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository.update(
        { id },
        { visibility: visibility, updated_at: new Date() },
      ),
      { message: 'Payment method was updated' }
    );
  }

  async accessibility(id, param: string) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository.update(
        { id },
        {
          is_allowed: EIsAllowedPaymentMenthod[param.toUpperCase()],
          updated_at: new Date(),
        },
      ),
      { message: 'Payment method was updated' }
    );
  }

  async deleteOne(id: number) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository.delete(id),
      { message: 'Payment method was successfully deleted' }
    );
  }
}
