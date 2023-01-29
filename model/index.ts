import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import config from "../config";
dotenv.config();

export const sequelize = new Sequelize(
  config.DB_MYSQL,
  config.USER_MYSQL,
  config.PASS_MYSQL,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = import('./User.model')

db.sequelize.sync({ force: false }).then(() => {
  console.log("SQL done query create table...");
});

export default db;
