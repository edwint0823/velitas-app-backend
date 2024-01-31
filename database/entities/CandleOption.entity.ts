import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CandleTypeEntity } from './CandleType.entity';

@Entity('candle_types')
export class CandleOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'text',
  })
  url_image: string;

  @Column({
    type: 'float',
  })
  bulk_price: number;

  @Column({
    type: 'float',
  })
  retail_price: number;

  @Column({
    type: 'boolean',
  })
  is_pack: boolean;

  @Column({
    type: 'int',
  })
  candle_type_id: number;

  @OneToOne(() => CandleTypeEntity)
  @JoinColumn({ name: 'candle_type_id' })
  candle_type: CandleTypeEntity;
}
