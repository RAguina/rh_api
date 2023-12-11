
/*
const sequelize = new Sequelize('rent_house', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});
*/
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
