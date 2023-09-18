import express from "express";
import {fetchAction, manageAction,fetchAllJobList} from "../controllers/AdapterControler.js";


const actionRouter = express.Router();
actionRouter.use(express.json());
console.log('ive been called');
actionRouter.post('/manageAction',manageAction);
actionRouter.get('/:internal_axon_id',fetchAction);
actionRouter.post('/fetchJobList',fetchAllJobList);
export default actionRouter;