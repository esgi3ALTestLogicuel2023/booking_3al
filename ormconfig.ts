import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: +process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
});
