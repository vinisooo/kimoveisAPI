import { MigrationInterface, QueryRunner } from "typeorm";

export class createTablesAndRelations1677894700740 implements MigrationInterface {
    name = 'createTablesAndRelations1677894700740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "street" varchar(45) NOT NULL, "zipCode" varchar(8) NOT NULL, "number" varchar(6), "city" varchar(20) NOT NULL, "state" varchar(2) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (1), "value" decimal(12,2) NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "categoryId" integer)`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(45) NOT NULL, "email" varchar(45) NOT NULL, "admin" boolean NOT NULL DEFAULT (0), "password" varchar(120) NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (1), "value" decimal(12,2) NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "categoryId" integer, CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "categoryId" FROM "real_estate"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`ALTER TABLE "temporary_real_estate" RENAME TO "real_estate"`);
        await queryRunner.query(`CREATE TABLE "temporary_schedules_users_properties" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer, CONSTRAINT "FK_11b17aa7e1c2902a0d6cadcdf26" FOREIGN KEY ("realEstateIdId") REFERENCES "real_estate" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3c99851037061d5508bb415616d" FOREIGN KEY ("userIdId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_schedules_users_properties"("id", "date", "hour", "realEstateIdId", "userIdId") SELECT "id", "date", "hour", "realEstateIdId", "userIdId" FROM "schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
        await queryRunner.query(`ALTER TABLE "temporary_schedules_users_properties" RENAME TO "schedules_users_properties"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules_users_properties" RENAME TO "temporary_schedules_users_properties"`);
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "hour" time NOT NULL, "realEstateIdId" integer, "userIdId" integer)`);
        await queryRunner.query(`INSERT INTO "schedules_users_properties"("id", "date", "hour", "realEstateIdId", "userIdId") SELECT "id", "date", "hour", "realEstateIdId", "userIdId" FROM "temporary_schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "temporary_schedules_users_properties"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME TO "temporary_real_estate"`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "sold" boolean NOT NULL DEFAULT (1), "value" decimal(12,2) NOT NULL DEFAULT (0), "size" integer NOT NULL, "createdAt" date NOT NULL DEFAULT (datetime('now')), "updatedAt" date NOT NULL DEFAULT (datetime('now')), "categoryId" integer)`);
        await queryRunner.query(`INSERT INTO "real_estate"("id", "sold", "value", "size", "createdAt", "updatedAt", "categoryId") SELECT "id", "sold", "value", "size", "createdAt", "updatedAt", "categoryId" FROM "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "temporary_real_estate"`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}