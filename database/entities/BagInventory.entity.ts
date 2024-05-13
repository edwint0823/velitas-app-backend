import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BagEntity } from './Bag.entity';

@Entity('bags_inventory')
export class BagInventoryEntity {
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

  @OneToOne(() => BagEntity)
  @JoinColumn({ name: 'bag_id' })
  bag: BagEntity;
}
