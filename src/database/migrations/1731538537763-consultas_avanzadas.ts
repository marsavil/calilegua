import {MigrationInterface, QueryRunner} from "typeorm";

export class consultasAvanzadas1731538537763 implements MigrationInterface {
    name = 'consultasAvanzadas1731538537763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "compradorId" TO "comprador_id"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75" TO "UQ_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "fabricanteId" TO "fabricante_id"`);
        await queryRunner.query(`CREATE TABLE "categorias_productos" ("categoria_id" integer NOT NULL, "product_id" integer NOT NULL, CONSTRAINT "PK_7e12b9f3d5a4bb04f931a7f147a" PRIMARY KEY ("categoria_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3f520f48cdf24ef9fe9a4023c9" ON "categorias_productos" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1d498559a566a8456a4a1847b4" ON "categorias_productos" ("product_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_5da0064d7e830740c39f28601c" ON "producto" ("precio", "stock") `);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_f2c59774661db02f747afa2e01f" FOREIGN KEY ("comprador_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_460198c94e3236de9fae95451e4" FOREIGN KEY ("fabricante_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categorias_productos" ADD CONSTRAINT "FK_3f520f48cdf24ef9fe9a4023c9b" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categorias_productos" ADD CONSTRAINT "FK_1d498559a566a8456a4a1847b4f" FOREIGN KEY ("product_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categorias_productos" DROP CONSTRAINT "FK_1d498559a566a8456a4a1847b4f"`);
        await queryRunner.query(`ALTER TABLE "categorias_productos" DROP CONSTRAINT "FK_3f520f48cdf24ef9fe9a4023c9b"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_460198c94e3236de9fae95451e4"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5da0064d7e830740c39f28601c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1d498559a566a8456a4a1847b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f520f48cdf24ef9fe9a4023c9"`);
        await queryRunner.query(`DROP TABLE "categorias_productos"`);
        await queryRunner.query(`ALTER TABLE "producto" RENAME COLUMN "fabricante_id" TO "fabricanteId"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_f2c59774661db02f747afa2e01f" TO "UQ_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "comprador_id" TO "compradorId"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
