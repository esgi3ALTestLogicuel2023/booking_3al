import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRole1708388383884 implements MigrationInterface {
    name = 'UserRole1708388383884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
    }

}
