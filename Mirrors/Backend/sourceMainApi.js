import express from 'express';
import chatRouter from "../MicroServices/ChatMicroService.js";
import loginRouter from "../MicroServices/LoginMicroService.js";
import dbRouter from "../MicroServices/DbMicroService.js";
import gateWay from "../Contolers/GateWayConroller.js";
import gateWayRouter from "../MicroServices/GateWayMicroService.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use('/chatRouter',chatRouter);
app.use('/loginRouter',loginRouter);
app.use('/dbRouter',dbRouter);

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});



