import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { CashMovementEntity } from './CashMovement.entity';
import { OrderEntity } from './Order.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
  })
  partial: boolean;

  @Column({
    type: 'int',
  })
  movement_id: number;

  @Column({
    type: 'int',
  })
  order_id: number;

  @OneToOne(() => CashMovementEntity)
  @JoinColumn({ name: 'movement_id' })
  movement: CashMovementEntity;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;
}
