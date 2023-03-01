import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import "reflect-metadata";

const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**{ts, js}");
    const migrationPath: string = path.join(__dirname, "./migrations/**{ts, js}");

    const dbUrl: string | undefined = process.env.DATABASE_URL;

    if(!dbUrl){
        throw new Error("'DATABASE_URL' Does not exist");
    };

    const nodeEnv: string | undefined = process.env.NODE_ENV;

    if(nodeEnv === "test"){
        return {
            type: 'sqlite',
            database: ':memory:',
            synchronize: true,
            entities: [entitiesPath],
        };
    }

    return{
        type: 'postgres',
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationPath],
    }

}

export const AppDataSource = new DataSource(dataSourceConfig());