import express from "express";
import {createConversation, createReport, mtbiTest} from '../Contolers/ChatController.js';

const chatRouter = express.Router();
chatRouter.use(express.json());

chatRouter.post('/chat/report',createReport);
chatRouter.post('/chat/chatFlow',createConversation);

export default chatRouter;