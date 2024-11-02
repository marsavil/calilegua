import {MigrationInterface, QueryRunner} from "typeorm";

export class relationOneToOne1730504269352 implements MigrationInterface {
    name = 'relationOneToOne1730504269352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "operador" ADD "compradorId" integer`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75" UNIQUE ("compradorId")`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD "operadorId" integer`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD CONSTRAINT "UQ_fc56a7a0b73e0d7f6b4dea53079" UNIQUE ("operadorId")`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comprador" ADD CONSTRAINT "FK_fc56a7a0b73e0d7f6b4dea53079" FOREIGN KEY ("operadorId") REFERENCES "operador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comprador" DROP CONSTRAINT "FK_fc56a7a0b73e0d7f6b4dea53079"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP CONSTRAINT "UQ_fc56a7a0b73e0d7f6b4dea53079"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "operadorId"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "comprador" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "compradorId"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "operador" DROP COLUMN "createdAt"`);
    }

}
