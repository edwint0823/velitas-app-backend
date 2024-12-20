import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { StatusEntity } from './Status.entity';
import { OrderDetailEntity } from './OrderDetail.entity';
import { BagInventoryNeedEntity } from './BagInventoryNeed.entity';
import { PaymentEntity } from './Payment.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  code: string;

  @Column({
    type: 'float',
  })
  total_price: number;

  @Column({
    type: 'int',
  })
  total_quantity: number;

  @Column({
    type: 'date',
  })
  delivery_date: Date;

  @Column({
    type: 'varchar',
  })
  delivery_address: string;

  @Column({
    type: 'float',
    nullable: true,
    default: null,
  })
  delivery_price: number | null;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
  })
  additional_info: string | null;

  @Column({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP AT TIME ZONE 'EST'",
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: 'null',
  })
  updated_at: Date;

  @Column({
    type: 'text',
    nullable: true,
    default: 'null',
  })
  updated_by: string;

  @Column({
    type: 'int',
  })
  customer_id: number;

  @Column({
    type: 'int',
  })
  status_id: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => StatusEntity)
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'id' })
  orders_details: OrderDetailEntity[];

  @OneToMany(() => BagInventoryNeedEntity, (bagInventoryNeed) => bagInventoryNeed.order)
  @JoinColumn({ name: 'id' })
  bag_inventory_needs: BagInventoryNeedEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.order)
  @JoinColumn({ name: 'id' })
  payments: PaymentEntity[];
}
