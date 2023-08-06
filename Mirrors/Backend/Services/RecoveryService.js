import axios from "axios";
import axiosRetry from 'axios-retry';

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

            const res = await axios.post('/gateway', {
                queryTile: 'user.email',
                queryData: userId,
                update: {$set: {'user.password': newPassword}}
            }, {
                collection: 'users',
                'x_inf_token': token
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
                // The request was made, but the server responded with an error status code
                console.error('Server responded with an error:', error.response.status);
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('No response received from the server');
            } else {
                // Other errors
                console.error('An error occurred:', error.message);
            }
            throw error;
        }
    }
}
export default RecoveryService;
