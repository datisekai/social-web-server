import { DataTypes } from "sequelize";
import { sequelize } from ".";
import RoomUser from "./RoomUser.model";

const User = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    defaultValue: "male",
  },
  status:{
    type:DataTypes.BOOLEAN,
    defaultValue:true
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

User.hasMany(RoomUser)
RoomUser.belongsTo(User)

export default User;
