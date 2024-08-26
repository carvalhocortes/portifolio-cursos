import { DataSource } from 'typeorm';
import path from "path";

const entitiesPath = path.join(__dirname, "../entities");

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${entitiesPath}/*`]
});

export default AppDataSource;
