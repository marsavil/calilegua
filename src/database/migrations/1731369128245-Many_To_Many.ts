import {MigrationInterface, QueryRunner} from "typeorm";

export class ManyToMany1731369128245 implements MigrationInterface {
    name = 'ManyToMany1731369128245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categoria_productos_producto" ("categoriaId" integer NOT NULL, "productoId" integer NOT NULL, CONSTRAINT "PK_46104437ae73f5be2eb65d725b2" PRIMARY KEY ("categoriaId", "productoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b8afa9e9d34a0298232f43d10" ON "categoria_productos_producto" ("categoriaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_066878b34449eb4c7ed7972211" ON "categoria_productos_producto" ("productoId") `);
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" ADD CONSTRAINT "FK_0b8afa9e9d34a0298232f43d101" FOREIGN KEY ("categoriaId") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" ADD CONSTRAINT "FK_066878b34449eb4c7ed7972211d" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" DROP CONSTRAINT "FK_066878b34449eb4c7ed7972211d"`);
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" DROP CONSTRAINT "FK_0b8afa9e9d34a0298232f43d101"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_066878b34449eb4c7ed7972211"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b8afa9e9d34a0298232f43d10"`);
        await queryRunner.query(`DROP TABLE "categoria_productos_producto"`);
    }

}
