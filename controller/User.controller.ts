import User from "../model/User.model";
import { genarateAvatar, showInternal, showMissing } from "../shares";
import jwt from "jsonwebtoken";
import config from "../config";
import e from "express";
import { Op } from "sequelize";

const UserController = {
  register: async (req, res) => {
    try {
      const { phone, password, name } = req.body;
      if (!phone || !password || !name) {
        return showMissing(res);
      }

      const isExist = await User.findOne({
        where: {
          phone,
        },
      });
      if (isExist) {
        return res.status(400).json("Phone number is available");
      }

      const newUser: any = await User.create({
        phone,
        password,
        name,
        avatar: genarateAvatar(name),
      });

      const token = jwt.sign(
        {
          id: newUser.id,
          phone: newUser.phone,
        },
        config.JWT_SECRET,
        {
          expiresIn: "12h",
        }
      );

      return res.json({ token });
    } catch (error) {
      return showInternal(res, error);
    }
  },
  login: async (req, res) => {
    try {
      const { phone, password } = req.body;

      if (!phone || !password) {
        return showMissing(res);
      }

      const currentUser: any = await User.findOne({
        where: {
          phone,
        },
      });

      if (currentUser && currentUser.password === password) {
        const token = jwt.sign(
          {
            id: currentUser.id,
            phone: currentUser.phone,
          },
          config.JWT_SECRET,
          {
            expiresIn: "12h",
          }
        );
        return res.json({ token });
      }

      return res
        .status(400)
        .json("Số điện thoại hoặc mật khẩu không chính xác");
    } catch (error) {
      return showInternal(res, error);
    }
  },
  myInfo: async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Missing token" });
    }

    try {
      const decode: any = jwt.verify(token as string, config.JWT_SECRET);

      if (decode) {
        const currentUser: any = await User.findOne({
          where: { id: decode.id },
          attributes: {
            exclude: ["password"],
          },
        });

        if (currentUser) {
          return res.json(currentUser);
        }
      }

      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    } catch (error) {
      console.log("Catch:---", error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
  },
  getAllNotMe: async (req, res) => {
    try {
      const users = await User.findAll({
        where: {
          id: {
            [Op.ne]: req.userId,
          },
        },
        attributes: {
          exclude: ["password"],
        },
      });
      return res.json(users)
    } catch (error) {
      return showInternal(res, error);
    }
  },
};

export default UserController;
