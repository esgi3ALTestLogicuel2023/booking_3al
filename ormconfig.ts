import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: 5434,
  host: '0.0.0.0',
  username: 'root',
  password: 'root',
  database: 'booking',
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
});
