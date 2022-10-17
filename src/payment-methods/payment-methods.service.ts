import { Repository } from 'typeorm';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentMethod } from './entities/payment-method.entity';

// import { IsAllowedForNewUser } from './interfaces/payment-method.interfaces';

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
      is_allowed_for_new_users: body.is_allowed_for_new_users || true,
      instruction: body.instruction,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await this.paymentMethodRepository.save(newPaymentMethod);
  }

  async updateService(id, body) {
    await this.byId(id);
    return (
      await this.paymentMethodRepository
        .createQueryBuilder()
        .update()
        .set({
          method_name: body.method_name,
          minimal_payment: body.minimal_payment,
          maximal_payment: body.maximal_payment,
          is_allowed_for_new_users: body.is_allowed_for_new_users || true,
          instruction: body.instruction,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Payment method was updated' }
    );
  }

  async changeAccessibilityToNewUsers(id, param) {
    await this.byId(id);

    return (
      await this.paymentMethodRepository
        .createQueryBuilder()
        .update()
        .set({
          is_allowed_for_new_users: param,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
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
