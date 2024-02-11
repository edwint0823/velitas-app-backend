import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bags')
export class BagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'int',
  })
  capacity: number;

  @Column({
    type: 'boolean',
  })
  available: boolean;
}
