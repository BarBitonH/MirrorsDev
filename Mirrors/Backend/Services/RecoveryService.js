import axios from "axios";
import axiosRetry from 'axios-retry';
import EmailService from "./EmailService.js";

class RecoveryService {
    constructor() {
        axiosRetry(axios, {
            retries: 3,
            retryDelay: (retryCount) => retryCount * 1000,
        });
    }

    async updateUserPassword(userId, newPassword, token) {
        try {
            const queryUserToFind = {'user.email': userId};
            const queryPasswordToFind = {'user.password': newPassword};

            const res = await axios.post('http://localhost:3000/dbRouter/db/update', {
                queryTile: 'user.email',
                queryData: userId,
                method:'$set',
                update: {'user.password': newPassword}
            }, {
                collection: 'User_login',
                db:'Users',
                'x_mir_token': token
            });

            if (res.status === 200) {
                // Successful update
                return res.body;
            } else if (res.status === 404) {
                // User not found
                throw new Error('User not found');
            } else {
                // Other error codes
                throw new Error('Could not finish update');
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.status);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('An error occurred:', error.message);
            }
            throw error;
        }
    }
}
export default RecoveryService;

