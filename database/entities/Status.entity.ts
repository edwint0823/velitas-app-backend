import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './Order.entity';

@Entity('status')
export class StatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  public_name: string;

  @Column({
    type: 'int',
  })
  order: number;

  @OneToMany(() => OrderEntity, (order) => order.status)
  @JoinColumn({ name: 'id' })
  orders: OrderEntity[];
}
