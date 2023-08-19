import MongoDbService from '../Mirrors/Backend/Services/MongoDbService.js';
import Logger from './TestLogs.js';
const mongo = new MongoDbService();
const logger = new Logger();

describe('updateDB()', () => {
    test('Valid Find', async () => {
        const query = { internal_axon_id: '473f17c5-70a9-468b-be89-f85c17056999' };
        const db = 'Users'
        const collection = 'User_login'
        try {
            const result = await mongo.findFromDB(db, query, collection);
            expect(result.LoginProperty.email).toBe('bitonbarr10@gmail.com');
            logger.log('Valid Find Test: Passed');
        } catch (error) {
            logger.log('Valid Find Test: Error encountered - ' + error.message);
            throw error;
        }
    });

    test('Valid update using $push', async () => {
        const query = { names: { $exists: true } };
        const update = { names: 'newName' };
        const type = '$push';

        const result = await service.updateDB(db, query, update, collection, type);
        expect(result.modifiedCount).toBe(1);
    });

    test('Invalid update type', async () => {
        const query = { name: 'test' };
        const update = { name: 'updatedTest' };
        const type = 'invalidType';

        await expect(service.updateDB(db, query, update, collection, type)).rejects.toThrow('Not Exists Method for update');
    });

});
