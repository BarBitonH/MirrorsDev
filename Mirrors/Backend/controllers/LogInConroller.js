import { sendRecoveryEmail } from '../Services/EmailService.js';
import jwt from 'jsonwebtoken';
import LoginService from '../Services/LoginService.js';
import AuthService from '../Services/AuthService.js';
import TokenService from '../Services/TokenService.js';
import RecoveryService from "../Services/RecoveryService.js";
const SECRET_KEY = '421642034296';
const ACCESS_TOKEN_EXPIRATION_TIME = '15m';
const REFRESH_TOKEN_EXPIRATION_TIME = '1h';
const authService = new AuthService(SECRET_KEY);
const tokenService = new TokenService(SECRET_KEY, ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME);
const loginService = new LoginService(authService, tokenService);
const sessionStore = {};
const recoveryService = new RecoveryService();

export const login = async (req, res) => {
    try {
        console.log('the system called');
        const loginResults = await loginService.login(req.body.payload.username, req.body.payload.password, req.headers.referrer);
        if (loginResults.token && loginResults.internal_axon_id) {
            res.setHeader('x_inf_token',loginResults.token);
            return res.status(200).json({internal_axon_id: loginResults.internal_axon_id,needquestioneir:loginResults.needquestioneir});
        } else {
            // Invalid credentials (client error) - 401 Unauthorized
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during login' });
    }
};
export const logout = (req, res) => {
    const sessionId = req.headers.sessionId;
    if (sessionStore[sessionId]) {
        delete sessionStore[sessionId];
    }
    res.json({ message: 'Logout successful' });
};

export const recoverPassword = async (req, res) => {
    try {
        if(!req.headers['x_inf_token'])
            return res.status(400).json('Authentication Not included');
        const token = req.headers['x_inf_token'];
        if(!authService.verifyAccessToken(token) || req.headers['referrer'] !== '/gateway')
            return res.status(401).json('Unauthorized Authentication');
        if (!req.body.email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const email = req.body.email;
        const recoveryToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        const recoveryLink = `http://your-app-url/recover?token=${recoveryToken}`;
        await sendRecoveryEmail(email);
        res.status(200).json({ message: 'Recovery email sent' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during password recovery' });
    }
};
export const register = async (req,res)=>{
    try {
        console.log('registerService was called');
        if (!req.body.fullName || !req.body.email || !req.body.userType || !req.body.password||!req.body.country) {
            return res.status(400).json({message: 'wrong payload'});
            console.error('Wrong Payload structure');
        }
        if (typeof req.body.fullName !== 'string' ||
            typeof req.body.email !== 'string' ||
            typeof req.body.userType !== 'string' ||
            typeof req.body.password !== 'string' ||
            typeof req.body.country !== 'string') {
            return res.status(400).json({message: 'wrong payload'});
            console.error('Wrong Payload');
        }
        const json = {
            fullName: req.body.fullName,
            email: req.body.email,
            userType: req.body.userType,
            password: req.body.password,
            country: req.body.country
        }
        const responseRegister = loginService.register(json);
        return res.status(200).json({message: 'the user been created successfully'});
    }
    catch (error){
        res.status(500).json({message:'something Went wrong with registration'});
    }
};
export const changePasswordAfterRecovery = async (req, res) => {
    try {
        if (!req.headers['x_inf_token'])
            return res.status(400).json('Authentication Not included');

        const token = req.headers['x_inf_token'];

        if (!authService.verifyAccessToken(token) || req.headers['referrer'] !== '/gateway')
            return res.status(401).json('Unauthorized Authentication');

        if (!req.body.email || !req.body.newPassword) {
            return res.status(400).json({ message: 'Email and newPassword are required' });
        }

        // Call the updateUserPassword function and handle the response
        const result = await recoveryService.updateUserPassword(req.body.email, req.body.newPassword, token);

        if (result) {
            return res.status(200).json({ message: 'Password updated successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to update password' });
        }
    } catch (error) {
        console.error('An error occurred while changing password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};