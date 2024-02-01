import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bags_inventory')
export class BagInventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
  })
  capacity: number;

  @Column({
    type: 'int',
  })
  quantity: number;
}
