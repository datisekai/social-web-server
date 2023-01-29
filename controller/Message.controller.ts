import Message from "../model/Message.model";
import MessageReact from "../model/MessReact.model";
import React from "../model/React.model";
import Room from "../model/Room.model";
import RoomMess from "../model/RoomMess.model";
import User from "../model/User.model";
import { showInternal, showMissing } from "../shares";

const MessageController = {
  addMessage: async (req, res) => {
    try {
      const { content, type, roomId } = req.body;
      if (!content || !type || !roomId) {
        return showMissing(res);
      }

      const newMessage: any = await Message.create({
        content,
        type,
        userId: req.userId,
      });

      await Promise.all([
        RoomMess.create({
          roomId,
          userId: req.userId,
          messageId: newMessage.id,
        }),
        Room.update(
          {
            messageId: newMessage.id,
            updatedAt: Date.now(),
          },
          {
            where: {
              id: roomId,
            },
          }
        ),
      ]);

      const currentMessage = await RoomMess.findOne({
        where: {
          messageId: newMessage.id,
        },
        include: [
          {
            model: Message,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ["password"],
                },
              },
              {
                model: MessageReact,
                include: [
                  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                  },
                  React,
                ],
              },
            ],
          },
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
        ],
      });

      return res.json(currentMessage);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default MessageController;
