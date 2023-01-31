import Message from "../model/Message.model";
import MessageReact from "../model/MessReact.model";
import Room from "../model/Room.model";
import RoomMess from "../model/RoomMess.model";
import User from "../model/User.model";
import { showInternal, showMissing, showNotFound } from "../shares";

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
  recallMessage: async (req, res) => {
    try {
      const messageId = req.params?.id;

      if (!messageId) {
        return showMissing(res);
      }

      const currentMessage = await Message.findOne({
        where: {
          userId: req.userId,
          status: true,
        },
      });

      if (currentMessage) {
        await Message.update(
          { updatedAt: Date.now(), status: false },
          {
            where: {
              id: messageId,
            },
          }
        );

        return res.json(messageId);
      }
      return showNotFound(res);
    } catch (error) {
      return showInternal(res, error);
    }
  },
  reactMessage: async (req, res) => {
    try {
      const { react } = req.body;
      const messageId = req.params.id;

      if (!react || !messageId) {
        return showMissing(res);
      }

      const currentMessage = await MessageReact.findAll({
        where: {
          messageId,
        },
      });

      if (currentMessage.length > 0) {
        const isExist: any = currentMessage.find(
          (item: any) => item.userId === req.userId
        );
        if (isExist) {
          if (isExist.react == react) {
            await MessageReact.destroy({
              where: {
                id: isExist.id,
              },
            });
          } else {
            await MessageReact.update(
              {
                react,
              },
              {
                where: {
                  id: isExist.id,
                },
              }
            );
          }

          return res.json({
            messageId,
            react,
            userId: isExist.userId,
            id: isExist.id,
          });
        }
      }

      const newMessReact: any = await MessageReact.create({
        messageId,
        userId: req.userId,
        react,
      });
      return res.json({
        messageId: newMessReact.messageId,
        userId: newMessReact.userId,
        react: newMessReact.react,
        id: newMessReact.id,
      });
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default MessageController;
