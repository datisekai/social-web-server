import { DataTypes } from "sequelize";
import { sequelize } from ".";
import React from "./React.model";
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
  reactId: {
    type: DataTypes.INTEGER,
    references: {
      model: "reacts",
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

MessageReact.belongsTo(User)
React.hasMany(MessageReact)
MessageReact.belongsTo(React)

export default MessageReact;
