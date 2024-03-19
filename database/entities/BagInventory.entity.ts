import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
