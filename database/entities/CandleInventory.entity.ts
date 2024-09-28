import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CandleTypeEntity } from './CandleType.entity';

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

  @OneToOne(() => CandleTypeEntity)
  @JoinColumn({ name: 'candle_type_id' })
  candle: CandleTypeEntity;
}
