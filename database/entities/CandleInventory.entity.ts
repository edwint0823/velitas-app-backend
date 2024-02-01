import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candles_inventory')
export class CandleInventoryEntity {
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
}
