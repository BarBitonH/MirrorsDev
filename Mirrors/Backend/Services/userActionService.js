import axios from "axios";

class UserActionService {

    constructor() { }

    async manageUserAction(userType, internal_axon_id, internal_job_id, userAction, token) {
        const { initiator, titleInitiator, effected, titleEffected } = this.getIdentifiers(userType, internal_axon_id, internal_job_id);

        try {
            if (userAction === 'Left') {
                return await this.blockInteraction(titleInitiator, initiator, effected, token);
            } else {
                const isMatched = await this.checkMatchingInteraction(titleInitiator, initiator, effected, token);
                return isMatched;
            }
        } catch (error) {
            console.error("Error managing user action:", error);
            return false;
        }
    }

    getIdentifiers(userType, internal_axon_id, internal_job_id) {
        if (userType === 'Applicant') {
            return {
                initiator: internal_axon_id,
                titleInitiator: 'internal_axon_id',
                effected: internal_job_id,
                titleEffected: 'internal_job_id'
            };
        } else {
            return {
                initiator: internal_job_id,
                titleInitiator: 'internal_job_id',
                effected: internal_axon_id,
                titleEffected: 'internal_axon_id'
            };
        }
    }

    async blockInteraction(titleInitiator, initiator, effected, token) {
        const headers = {
            'x_mir_token': token,
            'db': 'Users',
            'collection': 'user_actions'
        };

        try {
            await axios.post('http://localhost3000/dbRouter/db/update', {
                queryTitle: titleInitiator,
                queryData: initiator,
                method: '$push',
                update: { block_interactions: effected }
            }, headers);

            return true;

        } catch (error) {
            console.error("Error blocking interaction:", error);
            return false;
        }
    }

    async checkMatchingInteraction(titleInitiator, initiator, effected, token) {
        const headers = {
            'x_mir_token': token,
            'db': 'Users',
            'collection': 'user_actions'
        };

        try {
            const findMatchesResult = await axios.post('http://localhost3000/dbRouter/db/find', {
                queryTitle: titleInitiator,
                queryData: initiator
            }, headers);

            if (effected in findMatchesResult.data['will_interactions']) {
                await this.createMatchInteraction(titleInitiator, initiator, effected, token);
                await this.createMatchInteraction(effected, titleInitiator, initiator, token);
                return true;
            } else {
                await this.createWillInteraction(titleInitiator, initiator, effected, token);
                return false;
            }
        } catch (error) {
            console.error("Error checking matching interaction:", error);
            return false;
        }
    }

    async createMatchInteraction(queryTitle, queryData, updateData, token) {
        const headers = {
            'x_mir_token': token,
            'db': 'Users',
            'collection': 'user_actions'
        };

        try {
            await axios.post('http://localhost3000/dbRouter/db/update', {
                queryTitle: queryTitle,
                queryData: queryData,
                method: '$push',
                update: { matches: updateData }
            }, headers);

        } catch (error) {
            console.error("Error creating match interaction:", error);
        }
    }

    async createWillInteraction(queryTitle, queryData, updateData, token) {
        const headers = {
            'x_mir_token': token,
            'db': 'Users',
            'collection': 'user_actions'
        };

        try {
            await axios.post('http://localhost3000/dbRouter/db/update', {
                queryTitle: queryTitle,
                queryData: queryData,
                method: '$push',
                update: { 'will_interactions': updateData }
            }, headers);

        } catch (error) {
            console.error("Error creating will interaction:", error);
        }
    }
}
export default UserActionService;
