import express from 'express'
import RoomController from '../controller/Room.controller';
import isLogin from '../middleware/isLogin';

const router = express.Router()

router.post('/',isLogin, RoomController.createRoom);
router.get('/user', isLogin, RoomController.userRoom)
router.get('/find/:id', isLogin, RoomController.findRoom)

export default router;