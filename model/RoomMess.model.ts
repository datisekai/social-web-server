import { DataTypes } from "sequelize";
import { sequelize } from ".";
import User from "./User.model";

const RoomMess = sequelize.define("room_messes", {
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
  messageId:{
    type:DataTypes.INTEGER,
    references:{
        model:'messages',
        key:'id'
    }
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

User.hasMany(RoomMess)
RoomMess.belongsTo(User)


export default RoomMess;
