import mongoose, {connect} from 'mongoose'
import {v4 as uuidv4} from 'uuid';
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\Omgene\\secrets.env')});
class MongoDbService {
    constructor() {
        this.dbURL = process.env.DB_CONNECTION_STRING;
        this.connected = false;
        this.dbName = '';
    }
    async updateDB(db,query, update, collection,type) {
        let collectionToUpdate = null;
        if (!this.connected)
            await this.connect();
        if (query !== null && collection !== null && update !== null) {
            try {
                    const dbToUpdate = mongoose.connection.useDb(db);
                    collectionToUpdate = dbToUpdate.collection(collection);
                if(type === '$set') {
                    const updateResult = await collectionToUpdate.updateOne(query, {$set: update});
                    return updateResult;
                }
                else if(type === '$push'){
                    const updateResult = await collectionToUpdate.updateOne(query, {$push: update});
                    return updateResult;
                }
                else
                    throw new Error('Not Exists Method for update');
            } catch (error) {
                console.error('Could not update in db');
                throw new Error('Could not update in db');
            }
        }
        console.error('Not exist query, update or collection');
    }

    async connect(dbUrl) {
        try {
            await mongoose.connect(this.dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Connected to MongoDbService');
            this.connected = true;
        } catch (error) {
            console.error('Error connecting to MongoDbService:', error);
        }
    }

    async insertToDb(db,json, collection) {
        let collectionToInsert = null;
        if (!this.connected) {
            await this.connect();
        }
        if (collection !== null) {
            try {
                const database = mongoose.connection.useDb(db);
                collectionToInsert = database.collection(collection);
                await collectionToInsert.insertOne(json);
                console.log('successfully inserted');
                return true;
            } catch (error) {
                console.log('Error with inserting');
                return false;
            }
        } else {
            console.log('collection is null');
        }
    }

    async findFromDB(db,query, collection) {
        let collectionToFind = null;
        if (!this.connected)
            await this.connect(db);
        if (query !== null && collection !== null) {
            try {
                const connection = mongoose.connection;
                const database = connection.useDb(db);
                const collectionToFind = database.collection(collection);
                const findResult = await collectionToFind.findOne(query);
                return findResult;
            } catch (error) {
                console.error('Could not find from db');
                throw new Error('Could not find from db');
            }
        }
        console.error('not exists query or not exists collection');
    }

    convertToJSON(bodyString) {
        const splitBody = bodyString.replace(/\\n\\n/g, '\\n').split('\\n').slice(1);
        let result = {};
        let key = "";

        splitBody.forEach(line => {
            if (line.startsWith('Chapter')) {
                key = line;
                result[key] = '';
            } else {
                result[key] += line;
            }
        });

        return JSON.stringify(result, null, 2);
    }
    splitQuery(query) {
        let [queryKey, queryValue] = query.split(":");
        let queryObj = {};
        queryObj[queryKey] = queryValue;
        return queryObj
    }
}
export default MongoDbService;