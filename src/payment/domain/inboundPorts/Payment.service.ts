import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IPaymentService } from './IPaymentService';
import { IPaymentRepository } from '../outboundPorts/IPaymentRepository';
import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';
import { PaymentMapper } from '../mappers/Payment.mapper';
import { CreatePaymentDto } from '../../adapters/model/createPaymentDto';
import { IAuthUser, paymentErrorMessages, paymentSuccessMessages } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { IOrderRepository } from '../../../order/domain/outboundPorts/IOrderRepository';
import { ICashMovementRepository } from '../../../cashMovement/domain/outboundPorts/ICashMovementRepository';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(IPaymentRepository)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(ICashMovementRepository)
    private readonly cashMovementRepository: ICashMovementRepository,
  ) {}

  async getPaymentsByOrderCode(orderCode: string): Promise<ListPaymentsByOrderDomain[]> {
    const payments = await this.paymentRepository.getPaymentsByOrderCode(orderCode);
    return PaymentMapper.listPaymentsByOrderMapper(payments);
  }

  async createPaymentForOrder(payment: CreatePaymentDto, user: IAuthUser): Promise<{ message: string }> {
    if (!user.is_superuser) {
      throw new HttpException(paymentErrorMessages.service.create.unauthorized, HttpStatus.UNAUTHORIZED);
    }
    try {
      const order = await this.orderRepository.getOrderAndStatusByCode(payment.order_code);
      if (!order) {
        throw new HttpException(paymentErrorMessages.service.create.orderNotFound, HttpStatus.BAD_REQUEST);
      }

      const payments = await this.paymentRepository.getPaymentsByOrderCode(payment.order_code);

      const orderPaymentDeficiency = order.total_price - payments.reduce((acc, val) => (acc += val.movement.amount), 0);

      if (orderPaymentDeficiency - payment.amount < 0) {
        throw new HttpException(paymentErrorMessages.service.create.paymentExceed, HttpStatus.BAD_REQUEST);
      }

      let paymentIsPartial = false;
      if (payments.length > 0 || orderPaymentDeficiency - payment.amount !== 0) paymentIsPartial = true;

      const cashMovementInfo = {
        amount: payment.amount,
        concept: `${paymentIsPartial ? 'Abono' : 'Pago total'} de pedido Nro ${order.code}`,
        bank_entity_id: payment.bank_entity_id,
        entry_movement: true,
        out_movement: false,
        created_by: user.id,
        payment: {
          partial: paymentIsPartial,
          movement_id: null,
          order_id: order.id,
        },
      };
      await this.cashMovementRepository.createEntryCashMovement(cashMovementInfo);
      return { message: paymentSuccessMessages.service.create.default };
    } catch (error) {
      const { message, status } = getErrorParams(error, '');
      throw new HttpException({ message }, status);
    }
  }
}
