import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configurations')
export class ConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  param: string;

  @Column({
    type: 'text',
  })
  value: string;
}
