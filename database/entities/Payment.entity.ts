import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
