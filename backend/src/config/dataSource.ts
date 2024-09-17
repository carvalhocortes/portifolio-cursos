import { DataSource } from 'typeorm';
import * as path from 'path';

const entitiesPath = path.join(__dirname, '../entities');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'super-cursos',
  entities: [`${entitiesPath}/*`]
});

export default AppDataSource;
