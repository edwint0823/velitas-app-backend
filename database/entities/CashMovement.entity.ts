import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BankEntityEntity } from './BankEntity.entity';

@Entity('cash_movements')
export class CashMovementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float',
  })
  amount: number;

  @Column({
    type: 'text',
  })
  concept: string;

  @Column({
    type: 'int',
  })
  bank_entity_id: number;

  @Column({
    type: 'boolean',
  })
  entry_movement: boolean;

  @Column({
    type: 'boolean',
  })
  out_movement: boolean;

  @Column({
    type: 'timestamp',
  })
  created_at: Date;

  @Column({
    type: 'int',
  })
  created_by: number;

  @ManyToOne(() => BankEntityEntity)
  @JoinColumn({ name: 'bank_entity_id' })
  bank_entity: BankEntityEntity;
}
