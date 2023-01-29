import { Op } from "sequelize";
import Message from "../model/Message.model";
import MessageReact from "../model/MessReact.model";
import React from "../model/React.model";
import Room from "../model/Room.model";
import RoomMess from "../model/RoomMess.model";
import RoomUser from "../model/RoomUser.model";
import User from "../model/User.model";
import { showInternal, showMissing } from "../shares";

const RoomController = {
  createRoom: async (req, res) => {
    try {
      const { receiveId } = req.body;

      if (!receiveId) {
        return showMissing(res);
      }

      const listRoomOfCurrentUser: any = await RoomUser.findAll({
        where: {
          userId: req.userId,
        },
        attributes: ["roomId"],
      });

      const isExistRoom: any = await RoomUser.findAll({
        where: {
          roomId: {
            [Op.in]: listRoomOfCurrentUser.map((item) => item.roomId),
          },
          userId: receiveId,
        },
        include: [
          {
            model: Room,
            where: {
              status: true,
            },
            include: [
              {
                model: RoomUser,
                include: [
                  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                  },
                ],
              },
              {
                model: RoomMess,
                order: [["createdAt", "desc"]],
                limit: 1,
                include: [
                  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                  },
                  {
                    model: Message,
                  },
                ],
              },
              {
                model: Message,
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
        ],
      });

      if (isExistRoom && isExistRoom.length > 0) {
        return res.json({ data: isExistRoom[0].room, isCreate: false });
      } else {
        const newRoom: any = await Room.create({
          status: true,
        });

        await RoomUser.bulkCreate([
          {
            roomId: newRoom.id,
            userId: req.userId,
          },
          {
            roomId: newRoom.id,
            userId: receiveId,
          },
        ]);

        const currentRoom = await Room.findOne({
          where: {
            id: newRoom.id,
          },
          include: [
            {
              model: RoomUser,
              include: [
                {
                  model: User,
                  attributes: {
                    exclude: ["password"],
                  },
                },
              ],
            },
            {
              model: RoomMess,
              order: [["createdAt", "desc"]],
              limit: 1,
              include: [
                {
                  model: User,
                  attributes: {
                    exclude: ["password"],
                  },
                },
                {
                  model: Message,
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
          ],
        });
        return res.json({ data: currentRoom, isCreate: true });
      }
    } catch (error) {
      return showInternal(res, error);
    }
  },
  userRoom: async (req, res) => {
    try {
      const roomUsers: any = await RoomUser.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Room,
            where: {
              status: true,
            },
            include: [
              {
                model: RoomUser,
                include: [
                  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                  },
                ],
              },
              {
                model: RoomMess,
                order: [["createdAt", "desc"]],
                limit: 1,
                include: [
                  {
                    model: User,
                    attributes: {
                      exclude: ["password"],
                    },
                  },
                  {
                    model: Message,
                  },
                ],
              },
              {
                model: Message,
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
            order:[['updatedAt','DESC']]
          },
        ],
      });

      return res.json(roomUsers.map((item: any) => item.room));
    } catch (error) {
      return showInternal(res, error);
    }
  },
  findRoom: async (req, res) => {
    try {
      const id = req.params.id;

      const currentRoom = await Room.findOne({
        where: {
          id,
          status: true,
        },
        include: [
          {
            model: RoomUser,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ["password"],
                },
              },
            ],
          },
          {
            model: RoomMess,
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
                    include: [User, React],
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.json(currentRoom);
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default RoomController;
