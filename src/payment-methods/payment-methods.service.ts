import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';

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

  async getAllPaymentMethods() {
    return await this.paymentMethodRepository.query(
      `SELECT * FROM payment_methods`,
    );
  }

  async createPaymentMethod(body) {
    const newPaymentMethod = await this.paymentMethodRepository.create({
      method_name: body.method_name,
      minimal_payment: body.minimal_payment,
      maximal_payment: body.maximal_payment,
      is_allowed_for_new_users: body.is_allowed_for_new_users,
      instruction: body.instruction,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return await this.paymentMethodRepository.save(newPaymentMethod);
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

  async changeAccessibilityToNewUsers(id, param) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository.update(
        { id },
        { is_allowed_for_new_users: param, updated_at: new Date() },
      ),
      { message: 'Payment method for new users was updated' }
    );
  }

  async deletePaymentMethod(id) {
    await this.byId(id);

    return await this.paymentMethodRepository.query(
      `DELETE FROM payment_methods WHERE id = "${id}"`,
    );
  }
}
