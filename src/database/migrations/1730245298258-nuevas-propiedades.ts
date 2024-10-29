import {MigrationInterface, QueryRunner} from "typeorm";

export class nuevasPropiedades1730245298258 implements MigrationInterface {
    name = 'nuevasPropiedades1730245298258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "producto" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "createdAt"`);
    }

}
