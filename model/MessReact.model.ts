import { DataTypes } from "sequelize";
import { sequelize } from ".";
import User from "./User.model";

const MessageReact = sequelize.define("mess_react", {
  messageId: {
    type: DataTypes.INTEGER,
    references: {
      model: "messages",
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
  react: {
    type: DataTypes.STRING,
    allowNull: false,
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


MessageReact.belongsTo(User)
User.hasMany(MessageReact)

export default MessageReact;
