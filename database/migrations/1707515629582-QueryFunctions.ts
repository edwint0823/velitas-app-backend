import { MigrationInterface, QueryRunner } from 'typeorm';

export class QueryFunctions1707515629582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE FUNCTION generate_order_code() 
    RETURNS VARCHAR(6) AS $$
      DECLARE new_code VARCHAR(6);
      BEGIN
          -- Generar un nuevo número aleatorio único
          LOOP
              new_code := LPAD(CAST(FLOOR(RANDOM() * 1000000) AS VARCHAR), 6, '0');
              EXIT WHEN NOT EXISTS (SELECT 1 FROM orders WHERE code = new_code);
          END LOOP;
          RETURN new_code;
      END;
    $$ LANGUAGE plpgsql;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP FUNCTION generate_order_code`);
  }
}

/*
*

    * BagsInventoryMovements
    * await queryRunner.createTable(
      new Table({
        name: 'bags_inventory_movements',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'bag_inventory_id',
            type: 'int',
          },
          {
            name: 'quantity',
            type: 'int',
          },
          {
            name: 'is_entry',
            type: 'boolean',
          },
          {
            name: 'is_out',
            type: 'boolean',
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
    * await queryRunner.createForeignKey(
      'bags_inventory_movements',
      new TableForeignKey({
        columnNames: ['bag_inventory_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bags_inventory',
        onDelete: 'CASCADE',
      }),
    );
    * await queryRunner.dropTable('bags_inventory_movements');
    *  */
