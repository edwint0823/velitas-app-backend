import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Orders1706533928202 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'code',
            type: 'varchar(6)',
            isUnique: true,
          },
          {
            name: 'total_price',
            type: 'float',
          },
          {
            name: 'total_quantity',
            type: 'int',
          },
          {
            name: 'delivery_date',
            type: 'date',
          },
          {
            name: 'delivery_address',
            type: 'varchar(255)',
          },
          {
            name: 'delivery_price',
            type: 'float',
            isNullable: true,
          },
          {
            name: 'additional_info',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updated_by',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'customer_id',
            type: 'int',
          },
          {
            name: 'status_id',
            type: 'int',
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'customers',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
