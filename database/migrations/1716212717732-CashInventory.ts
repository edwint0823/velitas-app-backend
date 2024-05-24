import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CashAvailable1716212717732 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cash_inventory',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'varchar(255)',
          },
          {
            name: 'unit_value',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cash_inventory');
  }
}
