import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { StatusEntity } from './Status.entity';
import { OrderDetailEntity } from './OrderDetail.entity';

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
    type: 'timestamp',
    default: 'now()',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: 'null',
  })
  updated_at: Date;

  @Column({
    type: 'int',
    nullable: true,
    default: 'null',
  })
  updated_by: number;

  @Column({
    type: 'int',
  })
  customer_id: number;

  @Column({
    type: 'int',
  })
  status_id: number;

  @OneToOne(() => CustomerEntity)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToOne(() => StatusEntity)
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'id' })
  orders_details: OrderDetailEntity[];
}
