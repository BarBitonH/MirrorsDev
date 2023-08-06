import express from 'express';
import cors from 'cors';
import { login, logout, recoverPassword,register} from '../Contolers/LogInConroller.js';

const loginRouter = express.Router();
loginRouter.use(cors({
    exposedHeaders: 'x_inf_token',
}));
loginRouter.use(express.json());
loginRouter.post('/login', login);
loginRouter.post('/logout', logout);
loginRouter.post('/register',register);
loginRouter.post('/recovery', recoverPassword);

export default loginRouter;