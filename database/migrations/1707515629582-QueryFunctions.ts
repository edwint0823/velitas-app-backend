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
