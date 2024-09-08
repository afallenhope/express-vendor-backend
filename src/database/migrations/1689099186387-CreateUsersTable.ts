import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1689099186387 implements MigrationInterface {
    name = 'CreateUsersTable1689099186387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "botusers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying(32) NOT NULL, "lastName" character varying(32) NOT NULL, "password" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'free', "online" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_caaae635fdb2305ed0ed72d3168" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying(32) NOT NULL, "lastName" character varying(32) NOT NULL, "email" character varying(64) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_bots_botusers" ("usersId" uuid NOT NULL, "botusersId" uuid NOT NULL, CONSTRAINT "PK_3f3fb153515048b6bcaa8d2abb3" PRIMARY KEY ("usersId", "botusersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cb7e510a5225e67ce8f0291998" ON "users_bots_botusers" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_53f27619fbefd7412132a85413" ON "users_bots_botusers" ("botusersId") `);
        await queryRunner.query(`ALTER TABLE "users_bots_botusers" ADD CONSTRAINT "FK_cb7e510a5225e67ce8f0291998a" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_bots_botusers" ADD CONSTRAINT "FK_53f27619fbefd7412132a85413f" FOREIGN KEY ("botusersId") REFERENCES "botusers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_bots_botusers" DROP CONSTRAINT "FK_53f27619fbefd7412132a85413f"`);
        await queryRunner.query(`ALTER TABLE "users_bots_botusers" DROP CONSTRAINT "FK_cb7e510a5225e67ce8f0291998a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_53f27619fbefd7412132a85413"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb7e510a5225e67ce8f0291998"`);
        await queryRunner.query(`DROP TABLE "users_bots_botusers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "botusers"`);
    }

}
