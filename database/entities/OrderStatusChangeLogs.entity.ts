import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
