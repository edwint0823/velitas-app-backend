import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class BagsInventoryNeed1707664235751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bags_inventory_need',
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
            name: 'order_id',
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
      'bags_inventory_need',
      new TableForeignKey({
        columnNames: ['bag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bags',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bags_inventory_need',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bags_inventory_need');
  }
}
