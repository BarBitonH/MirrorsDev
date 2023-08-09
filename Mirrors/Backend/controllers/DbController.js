import AuthService from "../Services/AuthService.js";
import mongoDbService from "../Services/MongoDbService.js";
import TokenService from "../Services/TokenService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});

const SECRET_KEY = process.env.JWT_INTERNAL_SECRET;
const authService = new AuthService(SECRET_KEY);
const mongo =new mongoDbService();

export const DbFind = async (req, res) => {
    try {
        if (!req.headers['x_inf_token']) {
            console.error('Access Token not provided');
            return res.status(400).json({ error: 'Access Token not provided' });
        }
        const accessToken = req.headers['x_inf_token'];
        if (!authService.verifyAccessToken(accessToken)) {
            console.error('Unauthorized token');
            return res.status(401).json({ error: 'Unauthorized token' });
        }
        if (!req.headers.db||!req.headers.collection || !req.body.queryData || !req.body.queryTitle ||
            typeof req.body.queryTitle !== 'string' || typeof req.body.queryData !== 'string' || typeof req.headers.collection !== 'string') {
            console.error('Bad Request: Parameters are missing');
            return res.status(400).json({ error: 'Parameters are missing' });
        }
        const db = req.headers.db;
        const query = {[req.body.queryTitle]: req.body.queryData};
        const collection = req.headers.collection;
        const result = await mongo.findFromDB(db,query, collection);

        if (!result || result.length === 0) {
            console.error('No data found');
            return res.status(404).json({ error: 'No data found' });
        }
        return res.status(200).json({ data: result });
    }
    catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: 'Bad request, invalid parameters.' });
        }
        else if (error instanceof SyntaxError) {
            return res.status(400).json({ error: 'Bad request, syntax error in the query.' });
        }
        else {
            return res.status(500).json({ error: 'Something went wrong, please try again.' });
        }
    }
}

export const DbInsert = async (req,res) =>{
    try{
        if(!req.headers['x_inf_token']) {
            console.error('Access Token not provided');
            return res.status(400).json({message:'Access Token not provided'});
        }
        const accessToken = req.headers['x_inf_token'];
        if(!authService.verifyAccessToken(accessToken)){
            console.error('Unauthorized token');
            return res.status(401).json({message:'Unauthorized token'});
        }
        const requestBody = req.body;
        if (!requestBody || typeof requestBody !== 'object' ||
            !req.headers['collection'] || typeof req.headers['collection'] !== 'string' || req.headers['collection'].trim().length === 0 ){
            return res.status(400).json({ error: 'Bad request, invalid parameters.' });
        }

        const collection = req.headers['collection'];
        const database = req.headers['db'];
        const isInsert = await mongo.insertToDb(database,requestBody,collection);

        if (!isInsert) {
            return res.status(500).json({error: 'Failed to insert data. Try again.'});
        }

        return res.status(200).json({message:'Inserted Successfully'});
    }
    catch(error){
        console.error(error);
        if (error instanceof TypeError) {
            return res.status(400).json({error: 'Bad request, invalid parameters.'});
        }
        else if (error instanceof SyntaxError) {
            return res.status(400).json({error: 'Bad request, syntax error in the query.'});
        }
        else {
            return res.status(500).json({error:'Something went wrong, please try again.'});
        }
    }
}
export const DbUpdate = async (req, res) => {
    try {
        const token = req.headers['x_inf_token'];
        if (!token) {
            console.error('Access Token not provided');
            return res.status(400).json({ error: 'Access Token not provided' });
        }
        const accessToken = req.headers['x_inf_token'];
        if(!authService.verifyAccessToken(accessToken)){
            console.error('Unauthorized token');
            return res.status(401).json({message:'Unauthorized token'});
        }
        const collection = req.headers.collection;
        const query = { [req.body.queryTitle]: req.body.queryData };
        const update = req.body.update;
        const db = req.headers.db;

        if (!collection || !query || !update ||
            typeof req.body.queryTitle !== 'string' || typeof req.body.queryData !== 'string'  || typeof collection !== 'string' ||
            collection.trim().length === 0|| typeof db !=='string'|| db.trim().length === 0){
            console.error('Bad Request: Invalid parameters to update');
            return res.status(400).json({ error: 'Invalid parameters to update' });
        }
        const updateResult = await mongo.updateDB(db,query, update, collection,req.body.method);

        if (updateResult.matchedCount > 0) {
            return res.status(200).json({ message: 'Update successful' });
        } else {
            console.error('No documents matched the provided query');
            return res.status(400).json({ error: 'No documents matched the provided query' });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            return res.status(400).json({ error: 'Bad request, invalid parameters.' });
        }
        else if (error instanceof SyntaxError) {
            return res.status(400).json({ error: 'Bad request, syntax error in the update.' });
        }
        else {
            return res.status(500).json({ error: 'Something went wrong, please try again.' });
        }
    }
}

