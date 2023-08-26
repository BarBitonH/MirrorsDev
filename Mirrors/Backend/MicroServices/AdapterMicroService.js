import express from "express";
import {manageAction} from "../controllers/AdapterControler.js";

const actionRouter = express.Router();
actionRouter.use(express.json());

actionRouter.post('/manageAction',manageAction);

export default actionRouter;