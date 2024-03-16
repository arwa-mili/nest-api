import { MigrationInterface, QueryRunner } from "typeorm";

export class Measurehistoryentitychanged61710501646167 implements MigrationInterface {
    name = 'Measurehistoryentitychanged61710501646167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` CHANGE \`marge\` \`marge\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`measure_schedule\` CHANGE \`marge\` \`marge\` int NOT NULL`);
    }

}
