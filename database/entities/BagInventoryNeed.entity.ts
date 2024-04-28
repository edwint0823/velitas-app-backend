import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { BagEntity } from './Bag.entity';

@Entity('bags_inventory_need')
export class BagInventoryNeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  bag_id: number;

  @Column({
    type: 'int',
  })
  order_id: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => BagEntity)
  @JoinColumn({ name: 'bag_id' })
  bag: BagEntity;
}
