import { DataTypes } from "sequelize";
import { sequelize } from ".";

const React = sequelize.define("reacts", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
  },
  icon:{
    type:DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});


export default React;
