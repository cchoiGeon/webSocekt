import express from 'express';
import { GetRoomId } from '../api/room/room.controller.js';

export const roomRouter = express.Router();

roomRouter.get('/',GetRoomId);