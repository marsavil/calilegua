import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateProductoTable1731372648613 implements MigrationInterface {
    name = 'CreateProductoTable1731372648613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying(255) NOT NULL, "precio" integer NOT NULL, "stock" integer NOT NULL, "descripcion" text NOT NULL, "imagen" character varying NOT NULL, "origen" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "fabricanteId" integer, CONSTRAINT "UQ_d86d179360134b4b74bda750664" UNIQUE ("nombre"), CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" ADD CONSTRAINT "FK_066878b34449eb4c7ed7972211d" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categoria_productos_producto" DROP CONSTRAINT "FK_066878b34449eb4c7ed7972211d"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`DROP TABLE "producto"`);
    }

}
