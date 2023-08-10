import MongoDbService from '../Mirrors/Backend/Services/MongoDbService.js';

let service;
const db = 'testDb';
const collection = 'testCollection';

beforeEach(() => {
    service = new MongoDbService();
});

afterEach(async () => {
    await service.disconnect();
});

describe('updateDB()', () => {
    test('Valid update using $set', async () => {
        const query = { name: 'test' };
        const update = { name: 'updatedTest' };
        const type = '$set';

        const result = await service.updateDB(db, query, update, collection, type);
        expect(result.modifiedCount).toBe(1);
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

    // ... Additional updateDB() tests
});
