import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BagEntity } from './Bag.entity';

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
    type: 'varchar',
  })
  observation: string;

  @Column({
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    type: 'text',
  })
  created_by: string;

  @OneToOne(() => BagEntity)
  @JoinColumn({ name: 'bag_id' })
  bag: BagEntity;
}
