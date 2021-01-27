import { Dialect } from 'sequelize/types';

export const appConfig = {
  database: {
    dialect: 'postgres' as Dialect,
    host: 'localhost',
    port: 5432,
    username: 'shipu',
    password: 'root',
    database: 'nest',
    logging: false,
  },
  jwtPrivateKey: 'jwtPrivateKey',
};
