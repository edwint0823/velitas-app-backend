import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('candle_types')
export class CandleTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;
}
