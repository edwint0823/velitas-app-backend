import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnCandleOptions1708700431576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'candle_options',
      new TableColumn({
        name: 'is_vip_pack',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('candle_options', 'is_vip_pack');
  }
}
