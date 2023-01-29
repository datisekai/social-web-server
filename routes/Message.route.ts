import express from 'express'
import MessageController from '../controller/Message.controller';
import isLogin from '../middleware/isLogin';

const router = express.Router();

router.post('/',isLogin, MessageController.addMessage);

export default router;