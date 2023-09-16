// Imports
import axios from "axios";
import path from "path";
import dotenv from "dotenv";
import TokenService from "./TokenService.js";

dotenv.config({ path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env') });

class FetchUserService {

    constructor() {
        this.tokenService = new TokenService(process.env.JWT_INTERNAL_SECRET);
        this.baseURL = 'http://localhost:3000/dbRouter/db';
    }

    async _sendPostRequest(endpoint, data, headers) {
        try {
            const response = await axios.post(`${this.baseURL}${endpoint}`, data, { headers });
            return response.data;
        } catch (error) {
            console.error("Error in axios request:", error.message);
            throw error;
        }
    }

    async findWhoToFetchForJobRequirements(internal_job_id, token) {
        const actionUser = await this._fetchActionOfUser(internal_job_id, token);
        console.log(actionUser);

        const possibleUsers = await this._fetchPossibleUsers(token);
        const internalAxonIds = possibleUsers.map(user => user.internal_axon_id);
    }

    async _fetchActionOfUser(internal_job_id, token) {
        const endpoint = '/find';
        const headers = this._getHeaders('Users', 'user_action', token);
        const data = {
            queryTitle: 'internal_job_id',
            queryData: internal_job_id
        };

        return this._sendPostRequest(endpoint, data, headers);
    }

    async _fetchPossibleUsers(token) {
        const endpoint = '/findAll';
        const headers = this._getHeaders('Users', 'User_profile', token);
        const data = {
            queryTitle: 'userType',
            queryData: 'applicant'
        };

        return this._sendPostRequest(endpoint, data, headers);
    }

    async fetchApplicantUser(internal_axon_id, token) {
        const endpoint = '/find';
        const headers = this._getHeaders('Users', 'User_profile', token);
        const data = {
            queryTitle: 'internal_axon_id',
            queryData: internal_axon_id
        };

        return this._sendPostRequest(endpoint, data, headers);
    }

    async fetchCompanyUser(internal_job_id, token) {
        const endpoint = '/find';
        const headers = this._getHeaders('Users', 'JobList', token);
        const data = {
            queryTitle: 'internal_job_id',
            queryData: internal_job_id
        };

        return this._sendPostRequest(endpoint, data, headers);
    }

    _getHeaders(database, collection, token) {
        return {
            'Content-Type': 'application/json',
            'db': database,
            'collection': collection,
            'x_mir_token': token
        };
    }
}

export default FetchUserService;
