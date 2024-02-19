import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class BagsInventoryMovements1707664397307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bags_inventory_movements',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'bag_id',
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
      'bags_inventory_movements',
      new TableForeignKey({
        columnNames: ['bag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bags',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bags_inventory_movements');
  }
}
