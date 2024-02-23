import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { CandleTypeEntity } from './CandleType.entity';
import { PackNameEntity } from './PackName.entity';
import { OrderDetailEntity } from './OrderDetail.entity';

@Entity('candle_options')
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
    type: 'boolean',
  })
  visible: boolean;

  @Column({
    type: 'int',
  })
  candle_type_id: number;

  @ManyToOne(
    () => CandleTypeEntity,
    (candle_type) => candle_type.candle_options,
  )
  @JoinColumn({ name: 'candle_type_id' })
  candle_type: CandleTypeEntity;

  @OneToMany(() => PackNameEntity, (pack_names) => pack_names.candle_option)
  @JoinColumn({ name: 'id' })
  pack_names: PackNameEntity[];

  @OneToMany(
    () => OrderDetailEntity,
    (order_details) => order_details.candle_option,
  )
  @JoinColumn({ name: 'id' })
  order_details: OrderDetailEntity[];
}
