import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CustomerEntity } from './Customer.entity';
import { StatusEntity } from './Status.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    unique: true,
  })
  code: number;

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
}
