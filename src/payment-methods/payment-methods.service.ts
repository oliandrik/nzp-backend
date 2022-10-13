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
    // let newPaymentMethod;
    // for (let i = 0; i < 10; i++) {
    //   newPaymentMethod = await this.paymentMethodRepository.create({
    //     method_name: Math.random().toString(36).slice(-5),
    //     minimal_payment: Math.floor(Math.random() * 10),
    //     maximal_payment: Math.floor(Math.random() * 500),
    //     new_users:
    //       Math.random() < 0.5
    //         ? AllowedForNewUser['allowed']
    //         : AllowedForNewUser['disallowed'],
    //     instruction: Math.random().toString(36).slice(-5),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   });
    // }
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

  async editPaymentMethod(body) {
    await this.byId(body.id);
  }
}
