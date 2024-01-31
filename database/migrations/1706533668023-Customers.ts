import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Customers1706533668023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'email',
            type: 'varchar(100)',
            isUnique: true,
          },
          {
            name: 'name',
            type: 'varchar(25)',
          },
          {
            name: 'phone_number',
            type: 'varchar(15)',
          },
          {
            name: 'price_type',
            type: 'varchar(15)',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers');
  }
}
