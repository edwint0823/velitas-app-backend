import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CashMovements1706540342010 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cash_movements',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'concept',
            type: 'text',
          },
          {
            name: 'bank_entity_id',
            type: 'int',
          },
          {
            name: 'entry_movement',
            type: 'boolean',
          },
          {
            name: 'out_movement',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_by',
            type: 'text',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'cash_movements',
      new TableForeignKey({
        columnNames: ['bank_entity_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bank_entities',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cash_movements');
  }
}
