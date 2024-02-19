import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bags_inventory_movements')
export class BagInventoryMovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  bag_id: number;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'boolean',
  })
  is_entry: boolean;

  @Column({
    type: 'boolean',
  })
  is_out: boolean;

  @Column({
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    type: 'int',
  })
  created_by: number;
}
