import express from "express";
import {fetchAction, manageAction} from "../controllers/AdapterControler.js";

const actionRouter = express.Router();
actionRouter.use(express.json());
actionRouter.post('/manageAction',manageAction);
actionRouter.get('/:internal_axon_id',fetchAction);
export default actionRouter;