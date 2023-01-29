import jwt from "jsonwebtoken";
import config from "../config";
import User from "../model/User.model";

const isLogin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Missing token" });
  }

  try {
    const decode: any = jwt.verify(token as string, config.JWT_SECRET);

    if (decode) {
      const currentUser: any = await User.findByPk(decode.id);

      if (currentUser) {
        req.userId = currentUser.id;
        next();
        return;
      }
    }

    console.log("failed islogin");

    return res.status(401).json({ success: false, message: "Not authorized" });
  } catch (error) {
    console.log("Catch:---", error);
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};

export default isLogin