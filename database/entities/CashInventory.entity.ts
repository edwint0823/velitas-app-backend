import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cash_inventory')
export class CashInventoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
  })
  unit_value: number;

  @Column({
    type: 'int',
  })
  quantity: number;
}
