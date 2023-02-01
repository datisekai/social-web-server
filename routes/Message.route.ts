import express from 'express'
import MessageController from '../controller/Message.controller';
import isLogin from '../middleware/isLogin';

const router = express.Router();

router.post('/',isLogin, MessageController.addMessage);
router.delete('/recall/:id',isLogin, MessageController.recallMessage)
router.post('/react/:id',isLogin, MessageController.reactMessage);
router.get('/seen/:id',isLogin, MessageController.seenMessage)

export default router;