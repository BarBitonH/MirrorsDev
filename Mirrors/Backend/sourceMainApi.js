import express from 'express';
import chatRouter from "./MicroServices/ChatMicroService.js";
import loginRouter from "./MicroServices/LoginMicroService.js";
import dbRouter from "./MicroServices/DbMicroService.js";
import cors from 'cors';
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({limit:'100mb'}));
app.use(bodyParser.urlencoded({limit:'100mb', extended: true}));
app.use('/chatRouter',chatRouter);
app.use('/loginRouter',loginRouter);
app.use('/dbRouter',dbRouter);

app.listen(3000, function () {
    console.log('App listening on port 3000!')
});



