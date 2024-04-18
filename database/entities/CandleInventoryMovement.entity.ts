import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candles_inventory_movements')
export class CandleInventoryMovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  candle_type_id: number;

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
    type: 'int',
  })
  created_by: number;
}
