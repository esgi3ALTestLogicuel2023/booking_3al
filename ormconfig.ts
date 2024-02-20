import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: 5432,
  host: 'postgres',
  username: 'root',
  password: 'root',
  database: 'booking',
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
});
