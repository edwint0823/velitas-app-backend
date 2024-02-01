import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class OrderStatusChangeLogs1706802037790 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_status_change_logs',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'order_id',
            type: 'int',
          },
          {
            name: 'old_status_id',
            type: 'int',
          },
          {
            name: 'new_status_id',
            type: 'int',
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
      'order_status_change_logs',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'orders',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_status_change_logs',
      new TableForeignKey({
        columnNames: ['old_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_status_change_logs',
      new TableForeignKey({
        columnNames: ['new_status_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'status',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_status_change_logs');
  }
}
