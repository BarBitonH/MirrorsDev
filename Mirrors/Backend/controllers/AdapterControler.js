import dotenv from "dotenv";
import path from "path";
import AuthService from "../Services/AuthService.js";
import UserActionService from "../Services/userActionService.js";

dotenv.config({ path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\Mirrors\\Backend\\secrets.env') });

const SECRET_KEY_INTERNAL = process.env.JWT_INTERNAL_SECRET;
const authService = new AuthService(SECRET_KEY_INTERNAL);
const manageUserActions = new UserActionService();

export const manageAction = async (req, res) => {
    if (!req.headers['x_mir_token']) {
        console.error('Access Token not provided');
        return res.status(400).json({ message: 'Access Token not provided' });
    }

    const accessToken = req.headers['x_mir_token'];

    if (!authService.verifyAccessToken(accessToken)) {
        console.error('Unauthorized token');
        return res.status(401).json({ message: 'Unauthorized token' });
    }

    if (!isValidRequestBody(req.body)) {
        console.error('Wrong Payload');
        return res.status(400).json({ message: 'Bad Request' });
    }

    try {
        const resultOfUserAction = manageUserActions.manageUserAction(req.body.user, req.body.internal_axon_id, req.body.internal_job_id, req.body.userType, accessToken);

        if (resultOfUserAction === true) {
            return res.status(200).json({ type: 'match' });
        } else if (resultOfUserAction === false) {
            return res.status(200).json({ type: 'Not match' });
        } else {
            console.error('Error occurred during match');
            return res.status(500).json({ message: 'Error occurred during match' });
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

function isValidRequestBody(body) {
    if (!body.userType || !body.internal_axon_id || !body.internal_job_id || !body.actionType) {
        return false;
    }

    if (typeof body.userType !== 'string' || typeof body.internal_axon_id !== 'string' || typeof body.internal_job_id !== 'string' || typeof body.actionType !== 'string') {
        return false;
    }

    return true;
}

export const fetchAction = async (req, res) => {
    if (!req.headers['x_mir_token']) {
        console.error('Access Token not provided');
        return res.status(400).json({message: 'Access Token not provided'});
    }

    const accessToken = req.headers['x_mir_token'];

    if (!authService.verifyAccessToken(accessToken)) {
        console.error('Unauthorized token');
        return res.status(401).json({message: 'Unauthorized token'});
    }
    if(req.params.internal_axon_id){

    }
}