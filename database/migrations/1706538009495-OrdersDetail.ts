import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class OrdersDetail1706538009495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders_detail',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name_list',
            type: 'text',
          },
          {
            name: 'price',
            type: 'float',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'observation',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'candle_option_id',
            type: 'int',
          },
          {
            name: 'order_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'orders_detail',
      new TableForeignKey({
        columnNames: ['candle_option_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'candle_options',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'orders_detail',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders_detail');
  }
}
