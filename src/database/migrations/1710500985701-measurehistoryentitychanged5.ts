import { MigrationInterface, QueryRunner } from "typeorm";

export class Measurehistoryentitychanged51710500985701 implements MigrationInterface {
    name = 'Measurehistoryentitychanged51710500985701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phoneNumber\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`role\` enum ('0', '1') NOT NULL, \`name\` varchar(255) NULL, \`surname\` varchar(255) NULL, \`password\` varchar(255) NULL, UNIQUE INDEX \`IDX_8c8852624ff983df5e82d3bc18\` (\`phoneNumber\`), UNIQUE INDEX \`IDX_bf6303ac911efaab681dc911f5\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`measure_history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`measure_schedule_id\` int NULL, \`measure_name\` int NULL, \`value\` float NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`measure\` (\`id\` int NOT NULL AUTO_INCREMENT, \`measure_name\` varchar(255) NOT NULL, \`unit\` enum ('MilliLiter', 'Liter', 'Gram') NOT NULL, \`measureType\` enum ('Daily', 'Laboratory') NULL, \`limitInf\` int NOT NULL, \`limitSup\` int NOT NULL, \`marge\` int NOT NULL, UNIQUE INDEX \`IDX_2f7e834b79cc244dd7955572ea\` (\`measure_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`measure_schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`specification\` varchar(255) NOT NULL, \`time\` time NOT NULL, \`iSOweekday\` enum ('7', '1', '2', '3', '4', '5', '6') NOT NULL, \`schedule_id\` int NULL, \`measure_id\` int NOT NULL, \`limitInf\` int NULL, \`limitSup\` int NULL, \`marge\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schedule\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL DEFAULT 'default', \`specification\` varchar(255) NOT NULL DEFAULT 'no spec', \`diseaseId\` int NULL, UNIQUE INDEX \`IDX_e368ef744f30cd79a04dfc5516\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disease\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8d91a7044538803aa90c0432ff\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disease_user_schedule\` (\`sched\` int NULL, \`user_id\` int NOT NULL DEFAULT '0', \`disease_id\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`user_id\`, \`disease_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phoneNumber\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NULL, \`role\` enum ('0', '1') NOT NULL, \`name\` varchar(255) NULL, \`surname\` varchar(255) NULL, \`gender\` tinyint NULL, \`birthdate\` date NULL, \`height\` float NULL, \`weight\` float NULL, \`password\` varchar(255) NULL, UNIQUE INDEX \`IDX_f2578043e491921209f5dadd08\` (\`phoneNumber\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medical-file\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_code_verification\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`phoneNumber\` int NOT NULL, \`password\` varchar(255) NOT NULL, \`otp\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`expiresAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`disease_usersaffected_user\` (\`diseaseId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_d0e3fb358b732924e16975a874\` (\`diseaseId\`), INDEX \`IDX_9e72b0a03b0ef55f13480ba296\` (\`userId\`), PRIMARY KEY (\`diseaseId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`measure_history\` ADD CONSTRAINT \`FK_04d7f58acfd250dd330be302c2e\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`measure_history\` ADD CONSTRAINT \`FK_73d4724f34b6dd07669d8ce4a57\` FOREIGN KEY (\`measure_schedule_id\`) REFERENCES \`measure_schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`measure_history\` ADD CONSTRAINT \`FK_ab304d782e859fba8478776ad12\` FOREIGN KEY (\`measure_name\`) REFERENCES \`measure\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` ADD CONSTRAINT \`FK_b0ecc48ec2f24331a8c81a695f7\` FOREIGN KEY (\`schedule_id\`) REFERENCES \`schedule\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` ADD CONSTRAINT \`FK_dbc4428a60bd6325dbb4bc8d4cd\` FOREIGN KEY (\`measure_id\`) REFERENCES \`measure\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schedule\` ADD CONSTRAINT \`FK_06fad20d3b84367abae2843183f\` FOREIGN KEY (\`diseaseId\`) REFERENCES \`disease\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`disease_user_schedule\` ADD CONSTRAINT \`FK_5693f5e4d910f7381ec7ba1737d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`disease_user_schedule\` ADD CONSTRAINT \`FK_8ef746fb4b2c87233cd8aba58e2\` FOREIGN KEY (\`disease_id\`) REFERENCES \`disease\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`medical-file\` ADD CONSTRAINT \`FK_b32fac864d9e50c4c2ec6d8ab82\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`disease_usersaffected_user\` ADD CONSTRAINT \`FK_d0e3fb358b732924e16975a8744\` FOREIGN KEY (\`diseaseId\`) REFERENCES \`disease\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`disease_usersaffected_user\` ADD CONSTRAINT \`FK_9e72b0a03b0ef55f13480ba296d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`disease_usersaffected_user\` DROP FOREIGN KEY \`FK_9e72b0a03b0ef55f13480ba296d\``);
        await queryRunner.query(`ALTER TABLE \`disease_usersaffected_user\` DROP FOREIGN KEY \`FK_d0e3fb358b732924e16975a8744\``);
        await queryRunner.query(`ALTER TABLE \`medical-file\` DROP FOREIGN KEY \`FK_b32fac864d9e50c4c2ec6d8ab82\``);
        await queryRunner.query(`ALTER TABLE \`disease_user_schedule\` DROP FOREIGN KEY \`FK_8ef746fb4b2c87233cd8aba58e2\``);
        await queryRunner.query(`ALTER TABLE \`disease_user_schedule\` DROP FOREIGN KEY \`FK_5693f5e4d910f7381ec7ba1737d\``);
        await queryRunner.query(`ALTER TABLE \`schedule\` DROP FOREIGN KEY \`FK_06fad20d3b84367abae2843183f\``);
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` DROP FOREIGN KEY \`FK_dbc4428a60bd6325dbb4bc8d4cd\``);
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` DROP FOREIGN KEY \`FK_b0ecc48ec2f24331a8c81a695f7\``);
        await queryRunner.query(`ALTER TABLE \`measure_history\` DROP FOREIGN KEY \`FK_ab304d782e859fba8478776ad12\``);
        await queryRunner.query(`ALTER TABLE \`measure_history\` DROP FOREIGN KEY \`FK_73d4724f34b6dd07669d8ce4a57\``);
        await queryRunner.query(`ALTER TABLE \`measure_history\` DROP FOREIGN KEY \`FK_04d7f58acfd250dd330be302c2e\``);
        await queryRunner.query(`DROP INDEX \`IDX_9e72b0a03b0ef55f13480ba296\` ON \`disease_usersaffected_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_d0e3fb358b732924e16975a874\` ON \`disease_usersaffected_user\``);
        await queryRunner.query(`DROP TABLE \`disease_usersaffected_user\``);
        await queryRunner.query(`DROP TABLE \`user_code_verification\``);
        await queryRunner.query(`DROP TABLE \`medical-file\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2578043e491921209f5dadd08\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`disease_user_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_8d91a7044538803aa90c0432ff\` ON \`disease\``);
        await queryRunner.query(`DROP TABLE \`disease\``);
        await queryRunner.query(`DROP INDEX \`IDX_e368ef744f30cd79a04dfc5516\` ON \`schedule\``);
        await queryRunner.query(`DROP TABLE \`schedule\``);
        await queryRunner.query(`DROP TABLE \`measure_schedule\``);
        await queryRunner.query(`DROP INDEX \`IDX_2f7e834b79cc244dd7955572ea\` ON \`measure\``);
        await queryRunner.query(`DROP TABLE \`measure\``);
        await queryRunner.query(`DROP TABLE \`measure_history\``);
        await queryRunner.query(`DROP INDEX \`IDX_bf6303ac911efaab681dc911f5\` ON \`doctor\``);
        await queryRunner.query(`DROP INDEX \`IDX_8c8852624ff983df5e82d3bc18\` ON \`doctor\``);
        await queryRunner.query(`DROP TABLE \`doctor\``);
    }

}
