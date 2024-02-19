import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CandleOptionEntity } from './CandleOption.entity';

@Entity('pack_names')
export class PackNameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
  })
  candle_option_id: number;

  @ManyToOne(() => CandleOptionEntity, (candle_option) => candle_option)
  @JoinColumn({ name: 'candle_option_id' })
  candle_option: CandleOptionEntity;
}
