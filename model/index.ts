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

// db.users = import("./User.model");
// db.species = import("./Species.model");
// db.categories = import("./Category.model");
// db.products = import("./Product.model");
// db.skuValues = import("./SkuValues.model");
// db.skus = import("./Sku.model");
// db.attributes = import("./Attribute.model");
// db.detailAttributes = import("./DetailAttribute.model");
// db.permissions = import("./Permission.model");
// db.actions = import("./Action.model");
// db.detailActions = import("./DetailAction.model");
// db.perActions = import("./Per_action.model");
// db.perDetailAction = import("./Per_detail_action.model");
// db.infos = import("./Info.model");

db.sequelize.sync({ force: false }).then(() => {
  console.log("SQL done query create table...");
});

export default db;
