import express from 'express';
import cors from 'cors';
import { login, logout, recoverPassword,register} from '../controllers/LogInConroller.js';

const loginRouter = express.Router();
loginRouter.use(cors({
    exposedHeaders: 'x_mir_token',
}));
loginRouter.use(express.json());
loginRouter.post('/login', login);
loginRouter.post('/logout', logout);
loginRouter.post('/register',register);
loginRouter.post('/recovery', recoverPassword);

export default loginRouter;