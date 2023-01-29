import { DataTypes } from "sequelize";
import { sequelize } from ".";
import MessageReact from "./MessReact.model";
import RoomMess from "./RoomMess.model";
import User from "./User.model";

const Message = sequelize.define("messages", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  type: {
    type: DataTypes.STRING,
   
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

Message.hasOne(RoomMess)
RoomMess.belongsTo(Message)

Message.hasMany(MessageReact)
MessageReact.belongsTo(Message)

Message.belongsTo(User)


export default Message;
