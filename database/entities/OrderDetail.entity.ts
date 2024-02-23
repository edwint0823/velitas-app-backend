import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './Order.entity';
import { CandleOptionEntity } from './CandleOption.entity';

@Entity('orders_detail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  name_list: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'text',
  })
  observation: string;

  @Column({
    type: 'int',
  })
  candle_option_id: number;

  @Column({
    type: 'int',
  })
  order_id: number;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => CandleOptionEntity)
  @JoinColumn({ name: 'candle_option_id' })
  candle_option: CandleOptionEntity;
}
