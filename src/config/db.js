import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('rent_house', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

export default sequelize;
 /* user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: password, 
  port: process.env.DB_PORT,
  
  //ssl: { require:true, rejectUnauthorized: false }
});
*/
