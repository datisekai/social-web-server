import { DataTypes } from "sequelize";
import { sequelize } from ".";
import User from "./User.model";

const RoomUser = sequelize.define("room_users", {
  roomId: {
    type: DataTypes.INTEGER,
    references: {
      model: "rooms",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
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


export default RoomUser;
