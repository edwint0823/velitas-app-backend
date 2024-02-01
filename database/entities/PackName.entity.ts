import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
