import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CandleOptions1706537593323 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'candle_options',
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
            name: 'url_image',
            type: 'text',
          },
          {
            name: 'bulk_price',
            type: 'float',
          },
          {
            name: 'retail_price',
            type: 'float',
          },
          {
            name: 'is_pack',
            type: 'boolean',
          },
          {
            name: 'candle_type_id',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'candle_options',
      new TableForeignKey({
        columnNames: ['candle_type_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'candle_types',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('candle_options');
  }
}
