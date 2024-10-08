import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { CandleTypeEntity } from './CandleType.entity';

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
    type: 'text',
  })
  created_by: string;

  @OneToOne(() => CandleTypeEntity)
  @JoinColumn({ name: 'candle_type_id' })
  candle: CandleTypeEntity;
}
