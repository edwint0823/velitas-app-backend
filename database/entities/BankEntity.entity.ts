import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank_entities')
export class BankEntityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;
}
