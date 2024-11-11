import {MigrationInterface, QueryRunner} from "typeorm";

export class oneToMany1731361986401 implements MigrationInterface {
    name = 'oneToMany1731361986401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ADD "fabricanteId" integer`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "fabricante" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "fabricante" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "fabricanteId"`);
    }

}
