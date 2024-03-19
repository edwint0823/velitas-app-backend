import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CandleOptionEntity } from './CandleOption.entity';

@Entity('candle_types')
export class CandleTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @OneToMany(
    () => CandleOptionEntity,
    (candle_option) => candle_option.candle_type,
  )
  @JoinColumn({ name: 'id' })
  candle_options: CandleOptionEntity[];
}
