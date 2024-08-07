import express from 'express';
import { SignupLogic } from '../api/signup/signup.controller.js';

export const signupRouter = express.Router();

signupRouter.post('/',SignupLogic);