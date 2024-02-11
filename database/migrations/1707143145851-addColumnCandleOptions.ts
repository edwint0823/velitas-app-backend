import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCandleOptions1707143145851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'candle_options',
      new TableColumn({
        name: 'visible',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('candle_options', 'visible');
  }
}
