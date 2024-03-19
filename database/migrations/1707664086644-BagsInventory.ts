import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class BagsInventory1707664086644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bags_inventory',
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
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'bags_inventory',
      new TableForeignKey({
        columnNames: ['bag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bags',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bags_inventory');
  }
}
