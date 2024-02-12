import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsStatus1707755483902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('status', [
      new TableColumn({
        name: 'public_name',
        type: 'varchar(50)',
        default: "''",
      }),
      new TableColumn({
        name: 'order',
        type: 'int',
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('status', ['public_name', 'order']);
  }
}
