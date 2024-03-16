import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'mysql',
    port: 3307,
    username: 'root',
    password: 'Arwa0000',
    database: 'hcareDB',
    entities: ['dist/**/*.entity.{ts,js}'],
    migrations: ['dist/database/migrations/*{.ts,.js}'],
    //migrationsTableName: "test_migration",
    synchronize: false,
    logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;