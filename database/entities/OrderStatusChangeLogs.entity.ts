import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './Order.entity';
import { StatusEntity } from './Status.entity';

@Entity('order_status_change_logs')
export class OrderStatusChangeLogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  order_id: number;

  @Column({
    type: 'int',
  })
  old_status_id: number;

  @Column({
    type: 'int',
  })
  new_status_id: number;

  @Column({
    type: 'timestamp',
    default: 'now()',
  })
  created_at: Date;

  @Column({
    type: 'text',
  })
  created_by: string;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(() => StatusEntity)
  @JoinColumn({ name: 'old_status_id' })
  old_status: StatusEntity;

  @ManyToOne(() => StatusEntity)
  @JoinColumn({ name: 'new_status_id' })
  new_status: StatusEntity;
}
