import express from 'express';
import loginRouter from "./MicroServices/LoginMicroService.js";
import dbRouter from "./MicroServices/DbMicroService.js";
import cors from 'cors';

const app = express();
app.use(cors());
app.use('/loginRouter',loginRouter);
app.use('/dbRouter',dbRouter);
app.listen(3000, function () {
    console.log('App listening on port 3000!')
});