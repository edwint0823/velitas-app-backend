import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { CashMovementEntity } from './CashMovement.entity';

@Entity('bank_entities')
export class BankEntityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @OneToMany(() => CashMovementEntity, (cashMovements) => cashMovements.bank_entity)
  @JoinColumn({ name: 'id' })
  cash_movements: CashMovementEntity[];
}
