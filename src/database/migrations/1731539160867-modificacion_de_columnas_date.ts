import {MigrationInterface, QueryRunner} from "typeorm";

export class modificacionDeColumnasDate1731539160867 implements MigrationInterface {
    name = 'modificacionDeColumnasDate1731539160867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "categoria" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "detalle_pedido" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "categoria" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
