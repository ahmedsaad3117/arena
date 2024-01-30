import config from './config';

const ormconfig = {
  type: config.DB_TYPE as 'mysql',
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  charset: 'utf8mb4_general_ci',
  logging: false,
  //logging: false,
  // logging: true,

  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  synchronize: true,
  subscribers: [__dirname + '/../../**/*.subscriber{.ts, .js}'],
  // migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};

export default ormconfig;
