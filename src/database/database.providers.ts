import { Sequelize } from 'sequelize-typescript';
import { Cat } from '../cats/cat.entity';
import { appConfig } from '../config/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const database = appConfig.database;
      const sequelize = new Sequelize(database);
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];