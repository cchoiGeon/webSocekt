import express from 'express';
import { ChatDataGetLogic, ChatDataSaveLoic } from '../api/chat/chat.controller.js';

export const chatRouter = express.Router();

chatRouter.post('/',ChatDataSaveLoic);
chatRouter.get('/:roomId',ChatDataGetLogic);