import express from "express";
import {DbUpdate,DbInsert,DbFind} from "../controllers/DbController.js";

const dbRouter = express.Router();
dbRouter.use(express.json())

dbRouter.post('/db/update',DbUpdate);
dbRouter.post('/db/find',DbFind);
dbRouter.post('/db/insert',DbInsert);
export default dbRouter;