import { MigrationInterface, QueryRunner } from "typeorm"

export class ProductCollectionTypeAndCategories1685247285709 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "product_collection" ADD "type" character varying`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category" ADD "thumbnail" character varying`
        )
        await queryRunner.query(
          `CREATE TABLE "product_category_images" ("product_category_id" character varying NOT NULL, "image_id" character varying NOT NULL, CONSTRAINT "PK_10de97980da2e939c4c0e9963e7" PRIMARY KEY ("product_category_id", "image_id"))`
        )
        await queryRunner.query(
          `CREATE INDEX "IDX_4f166bb8c2bfcef9397e92b407" ON "product_category_images" ("product_category_id") `
        )
        await queryRunner.query(
          `CREATE INDEX "IDX_2212515ba306c9397fc46a99de" ON "product_category_images" ("image_id") `
        )
        await queryRunner.query(
          `ALTER TABLE "product_category_images" ADD CONSTRAINT "FK_4f166bb8c2bf9397df8d97b4069" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category_images" ADD CONSTRAINT "FK_2212515ba309397fe2c46a99db8" FOREIGN KEY ("image_id") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "product_collection" DROP COLUMN "type"`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category" DROP COLUMN "thumbnail"`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category_images" DROP CONSTRAINT "PK_10de97980da2e939c4c0e9963e7"`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category_images" DROP CONSTRAINT "FK_4f166bb8c2bf9397df8d97b4069"`
        )
        await queryRunner.query(
          `ALTER TABLE "product_category_images" DROP CONSTRAINT "FK_2212515ba309397fe2c46a99db8"`
        )
        await queryRunner.query(`DROP INDEX "IDX_4f166bb8c2bfcef9397e92b407"`)
        await queryRunner.query(`DROP INDEX "IDX_2212515ba306c9397fc46a99de"`)
        await queryRunner.query(`DROP TABLE "product_category_images"`)
    }

}
