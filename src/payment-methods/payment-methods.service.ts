import { Repository } from 'typeorm';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AllowedForNewUser,
  PaymentMethod,
} from './entities/payment-method.entity';

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
      new_users: AllowedForNewUser[body.new_users] || AllowedForNewUser.allowed,
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
          new_users:
            AllowedForNewUser[body.new_users] || AllowedForNewUser.allowed,
          instruction: body.instruction,
          updatedAt: new Date(),
        })
        .where('id = :id', { id: id })
        .execute(),
      { message: 'Payment method was updated' }
    );
  }

  async changeAccessibilityToNewUsers(id, param) {
    console.log(id, param);
    await this.byId(id);

    return (
      await this.paymentMethodRepository
        .createQueryBuilder()
        .update()
        .set({
          new_users: AllowedForNewUser[param],
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
