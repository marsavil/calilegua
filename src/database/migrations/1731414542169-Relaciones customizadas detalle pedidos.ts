import {MigrationInterface, QueryRunner} from "typeorm";

export class RelacionesCustomizadasDetallePedidos1731414542169 implements MigrationInterface {
    name = 'RelacionesCustomizadasDetallePedidos1731414542169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "detalle_pedido" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "cantidad" integer NOT NULL, "productoId" integer, "pedidoId" integer, CONSTRAINT "PK_123bec7ab52f5db0a11766f87c0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "compradorId" integer, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "detalle_pedido"`);
    }

}
