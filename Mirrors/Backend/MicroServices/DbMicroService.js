import express from "express";
import {DbUpdate,DbInsert,DbFind} from "../controllers/DbController.js";
import bodyParser from 'body-parser'
const dbRouter = express.Router();
dbRouter.use(express.json())
dbRouter.use(bodyParser.json({limit:'100mb'}));
dbRouter.use(bodyParser.urlencoded({limit:'100mb', extended: true}));
dbRouter.post('/db/update',DbUpdate);
dbRouter.post('/db/find',DbFind);
dbRouter.post('/db/insert',DbInsert);
export default dbRouter;