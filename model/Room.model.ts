import { DataTypes } from "sequelize";
import { sequelize } from ".";
import Message from "./Message.model";
import RoomMess from "./RoomMess.model";
import RoomUser from "./RoomUser.model";
import User from "./User.model";

const Room = sequelize.define("rooms", {
  messageId: {
    type: DataTypes.INTEGER,
    references: {
      model: Message,
      key: "id",
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
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

Room.hasMany(RoomUser);
RoomUser.belongsTo(Room);

Room.belongsTo(Message);

Room.hasMany(RoomMess);
RoomMess.belongsTo(Room);

export default Room;
