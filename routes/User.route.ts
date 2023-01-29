import express from "express";
import UserController from "../controller/User.controller";
import isLogin from "../middleware/isLogin";
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", UserController.myInfo);
router.get('/user-not-me',isLogin,UserController.getAllNotMe)

export default router;
