import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bags_inventory_need')
export class BagInventoryNeedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  bag_inventory_id: number;

  @Column({
    type: 'int',
  })
  order_id: number;

  @Column({
    type: 'int',
  })
  quantity: number;
}
