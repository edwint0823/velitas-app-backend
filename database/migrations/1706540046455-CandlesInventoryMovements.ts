import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CandlesInventoryMovements1706540046455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candles_inventory_movements',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'candle_type_id',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'is_entry',
            type: 'boolean',
          },
          {
            name: 'is_out',
            type: 'boolean',
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: true,
            default: "'Sin observaciones'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_by',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'candles_inventory_movements',
      new TableForeignKey({
        columnNames: ['candle_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'candle_types',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candles_inventory_movements');
  }
}
