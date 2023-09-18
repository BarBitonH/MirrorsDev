import axios from "axios";
import tokenService from "./TokenService.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});


class fetchUserService {
    constructor() {
        this.tokenService = new tokenService(process.env.JWT_INTERNAL_SECRET);
    }

    async findWhoToFetchForJobRequirements(internal_job_id,token) {
        const endPointToFetchAllUsers = 'http://localhost:3000/dbRouter/db/findAll';
        const endPointToFetchActionOfUser = 'http://localhost:3000/dbRouter/db/find';

        const headersToFetchActionOfUser = {
            'Content-Type': 'application/json',
            'db': 'Users',
            'collection': 'user_action',
            'x_mir_token': token
        };
        const dataToFetchActionOfUser = {
            queryTitle: 'internal_job_id',
            queryData: internal_job_id
        };

        const thisUserToVerifyMatchResponse = await axios.post(endPointToFetchActionOfUser, dataToFetchActionOfUser, {headers: headersToFetchActionOfUser});
        const thisUserToVerifyMatch = thisUserToVerifyMatchResponse.data.data;

        const headersToFetchPossibleUsers = {
            'Content-Type': 'application/json',
            'db': 'Users',
            'collection': 'User_profile',
            'x_mir_token': token
        };
        const dataToFetchPossibleUsers = {
            queryTitle: 'profileData.userType',
            queryData: 'applicant'
        };

        const possibleOffersResponse = await axios.post(endPointToFetchAllUsers, dataToFetchPossibleUsers, {headers: headersToFetchPossibleUsers});
        const possibleOffers = possibleOffersResponse.data.data;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]]; // Swap elements
            }
        }

        shuffleArray(possibleOffers); // Randomize the order

        for (const offer of possibleOffers) {
            if (
                !thisUserToVerifyMatch.will_interactions.includes(offer.internal_axon_id) &&
                !thisUserToVerifyMatch.blocked_interactions.includes(offer.internal_axon_id) &&
                !thisUserToVerifyMatch.matches.includes(offer.internal_axon_id)
            ) {
                return offer;
            }
        }

        return null; // If no suitable internal_axon_id is found
    }


    async fetchApplicantUserForCompany(internal_job_id, token) {
        const endpoint = 'http://localhost:3000/dbRouter/db/find';
        const headers = {
            'Content-Type': 'application/json',
            'db': 'Users',
            'collection': 'User_profile',
            'x_mir_token': token
        };
        const data = {
            queryTitle: 'internal_axon_id',
            queryData: internal_axon_id
        };

        try {
            const response = await axios.post(endpoint, data, {headers: headers});
            return {internal_axon_id: response.data.data['internal_axon_id'], userData: response.data.data.profileData};
        } catch (error) {
            console.error("There was a problem with the axios request:", error.message);
        }
    }

    async fetchComapnyUser(internal_job_id, token) {
        const endpoint = 'http://localhost:3000/dbRouter/db/find';
        const headers = {
            'Content-Type': 'application/json',
            'db': 'Users',
            'collection': 'JobList',
            'x_mir_token': token
        };
        const data = {
            queryTitle: 'internal_job_id',
            queryData: internal_job_id
        };

        try {
            const response = await axios.post(endpoint, data, {headers: headers});
            return {internal_axon_id: response.data.data['internal_axon_id'], userData: response.data.data.profileData};
        } catch (error) {
            console.error("There was a problem with the axios request:", error.message);
        }
    }

    async fetchAllJobList(internal_axon_id, token) {
        const headers = {
            collection: 'user_action',
            db: 'Users',
            'x_mir_token': token
        };
        const dataForFetching = {
            queryTitle: 'internal_axon_id',
            queryData: internal_axon_id
        };
        try {
            const resultOfLists = await axios.post('http://localhost:3000/dbRouter/db/findAll', dataForFetching, { headers: headers });

            if (resultOfLists.status === 401) {
                throw new Error('Unauthorized access.');
            } else if (resultOfLists.status === 404) {
                throw new Error('Resource not found.');
            } else if (resultOfLists.status !== 200) {
                throw new Error(`Received HTTP status ${resultOfLists.status}.`);
            }

            if (!resultOfLists.data || !Array.isArray(resultOfLists.data.data)) {
                throw new Error('Malformed response body.');
            }

            return resultOfLists.data.data.map(job => ({
                internal_job_id: job.internal_job_id,
                title: job.title
            }));

        } catch (error) {
            if (!error.response) {
                console.error('Network error:', error.message);
            } else {
                console.error('Failed to fetch job list:', error.message);
            }
            throw error;
        }
    }
}

export default fetchUserService;


