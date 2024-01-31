import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './Order.entity';

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  phone_number: string;

  @Column({
    type: 'varchar',
  })
  price_type: string;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];
}
