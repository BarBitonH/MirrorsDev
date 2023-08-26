import AuthService from '../Services/AuthService.js';
import TokenService from '../Services/TokenService.js';
import ChatGptService from "../Services/ChatGptService.js";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from "axios";
import * as path from "path";

dotenv.config({path:path.resolve('C:\\Users\\Admin\\WebstormProjects\\Mirrors\\Backend\\secrets.env')});
const gptService = new ChatGptService();
const SECRET_KEY_INTERNAL = process.env.JWT_INTERNAL_SECRET;
const ACCESS_TOKEN_EXPIRATION_TIME = process.env.JWT_EXP_TIME;
const REFRESH_TOKEN_EXPIRATION_TIME = process.env.JWT_REFRESH_TIME;
const authService = new AuthService(SECRET_KEY_INTERNAL);
const tokenService = new TokenService(SECRET_KEY_EXTERNAL, ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_EXPIRATION_TIME);
export const createReport = async (req, res) => {
    if (!req.headers['x_mir_token']) {
        console.error('Access Token not provided');
        return res.status(400).json({ message: 'Access Token not provided' });
    }

    const accessToken = req.headers['x_mir_token'];

    if (!authService.verifyAccessToken(accessToken)) {
        console.error('Unauthorized token');
        return res.status(401).json({ message: 'Unauthorized token' });
    }

    try {
        const mtbi = await gptService.extractMtbi(req.body.internal_axon_id, tokenService.generateAccessToken({ internal_axon_id: req.body.internal_axon_id }));
        const answers = req.body.reportResults;
        answers['mtbi'] = mtbi;
        const genes = await gptService.extractUserGenes(req.body.internal_axon_id, tokenService.generateAccessToken({ internal_axon_id: req.body.internal_axon_id }));
        answers['user_genes'] = genes;
        let { pdf, reportString } = await gptService.createFinalyReport(req.body.reportResults,req.body.internal_axon_id,tokenService.generateAccessToken({internal_axon_id:req.body.internal_axon_id}));
        if (!pdf || !reportString) {
            console.error('Error in creating report');
            return res.status(500).json({ message: 'Error in creating report' });
        }

        const queryTitle = 'internal_axon_id';
        const queryData = req.body.internal_axon_id;
        const updateReportString = {'personalityData.stringReport': reportString};
        let headersUpdateString = {
            'x_mir_token': tokenService.generateAccessToken({queryTitle, queryData,method:'$set'}),
            'destinationurl': 'http://localhost:3000/dbRouter/db/update',
            'collection': 'User_login',
            'db': 'Users',
            method:'$set'
        };
        try {
            // const summarizedReport  = Promise.all(
            //     Object.entries(updateReportString["personalityData.stringReport"]).map(
            //         async ([key,value]) => {
            //             return gptService.createSummaryAndInsertSummaryToDb(value);
            //         }
            //     )
            // );
            let responses = await Promise.all(Object.entries(updateReportString["personalityData.stringReport"]).map(async ([key, value]) =>
                axios.post('http://localhost:3000/gateWayRouter/gateWay',
                    {
                        queryTitle: queryTitle,
                        queryData: queryData,
                        update: { [key]: value },
                        method :'$set'
                    },
                    { headers: headersUpdateString })
            ));

            if (responses.every(response => response.status === 200)) {
                return res.status(200).json({ data: pdf });
            }
        } catch (error) {
            console.error(`Error in updating report: ${error.message}`);
            return res.status(500).json({ message: `Error in updating report: ${error.message}` });
        }
    } catch (error) {
        console.error(`Error in creating report: ${error.message}`);
        return res.status(500).json({ message: `Error in creating report: ${error.message}` });
    }
};

export const mtbiTest = async(req, res) => {
    if (!req.headers['x_mir_token']) {
        console.error('Access Token not provided');
        return res.status(400).json({message:'Access Token not provided'});
    }
    const accessToken = req.headers['x_mir_token'];
    if (!authService.verifyAccessToken(accessToken)){
        console.error('Unauthorized token');
        return res.status(401).json({message:'Unauthorized token'});
    }
    if (!req.body.mtbiResults) {
        console.error('Test results not provided');
        return res.status(400).json({message:'Bad Request - Test results not provided'});
    }

    try {
        const mtbiTest = new MtbiTest()
        const mtbiResults = mtbiTest.getUserPersonality(Object.values(req.body.mtbiResults));
        const payload = {
            queryTitle : 'internal_axon_id',
            queryData : req.body.internal_axon_id,
            update: {'personalityData.mtbiResult': mtbiResults},
            method:'$set'
        };
        try {
            const insertResult = await axios.post('http://localhost:3000/gateWayRouter/gateWay',
                payload,{headers: {
                        'x_mir_token': tokenService.generateAccessToken(payload),
                        'destinationurl' : 'http://localhost:3000/dbRouter/db/update',
                        'collection':'User_login',
                        'db':'Users'
                    }
                });

            if (insertResult.status !== 200 ) {
                console.error(`Failed to insert MTBI results: ${insertResult.status}`);
                return res.status(404).json({message:'Failed to insert MTBI results'});
            }

            return res.status(200).json({body:mtbiResults});
        } catch (error) {
            console.error(`Error in inserting MTBI results: ${error.message}`);
            return res.status(500).json({message:`Error in inserting MTBI results: ${error.message}`});
        }
    } catch(error) {
        console.error(`Error in MTBI Test: ${error.message}`);
        return res.status(500).json({message: `Error in MTBI Test: ${error.message}`});
    }
};

export const createConversation = async (req, res) => {
    try {
        if (!req.headers['x_mir_token']) {
            console.error('Access Token not provided');
            return res.status(400).json({message: 'Access Token not provided'});
        }
        const accessToken = req.headers['x_mir_token'];
        if (!authService.verifyAccessToken(accessToken)) {
            console.error('Unauthorized token');
            return res.status(401).json({message: 'Unauthorized token'});
        }
        if (!req.body.questionByUser || req.body.questionByUser.length < 1) {
            return res.status(404).json({message: 'User question empty or not exists'})
        }
        const resultByGpt = await gptService.generateChatConverSation(req.body.questionByUser, req.body.internal_axon_id, tokenService.generateAccessToken({question: req.body.questionByUser,internal_axon_id:req.body.internal_axon_id}));
        return res.status(200).json(resultByGpt);
    }
    catch(error){
        return res.status(500).json({message:'Something Went Wrong with the conversation'});
    }
}
