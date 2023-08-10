import axios from 'axios';
import { v4 as uuid } from 'uuid';
import AuthService from './AuthService.js';
import TokenService from './TokenService.js';
import dotenv from "dotenv";
import path from "path";
import * as crypto from "crypto";
import {sendSuccessfullyRegisterUser} from "./EmailService.js";
dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});

class LoginService {
    constructor() {
        this.authService = new AuthService();
        this.tokenService = new TokenService(process.env.JWT_INTERNAL_SECRET,);
    }

    async login(email, password,  expectedReferer) {
        try {
            // Input validation
            if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
                throw new Error('Email and password must be string and are required');
            }

            // Authenticate user and retrieve user data
            const user = await this.fetchUser(email);

            // Verify password
            const isMatch = await this.verifyPassword(password, user.LoginProperty.password);

            if (!isMatch) {
                throw new Error('Invalid password');
            }

            // Generate a new access and refresh token
            return {token:this.tokenService.generateAccessToken(user),internal_axon_id:user.internal_axon_id,needquestioneir:user.needQuestioneir}

            // Return the access and refresh tokens
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred during login');
        }
    }

    async fetchUser(email,token) {
        try {
            const payload =  {queryTitle: 'LoginProperty.email', queryData: email,dbUrl:'Users' }
            const userResponse = await axios.post('http://localhost:3000/gateWayRouter/gateWay',payload, {
                headers: {
                    'destinationUrl': 'http://localhost:3000/dbRouter/db/find',
                    'collection':'User_login',
                    'db':'Users',
                    'x_inf_token':this.tokenService.generateAccessToken(payload)
                },
            });

            if (userResponse.data.length === 0) {
                throw new Error('User not found');
            }
            if(userResponse.status === 200)
                return userResponse.data.body.data;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user');
        }
    }

    async verifyPassword(password, hashedPassword) {
        try {
            const encryptedPassword = hashedPassword;
            const key = Buffer.from(process.env.HSHING_PASSWORD_SECRET,'utf8');
            const iv = Buffer.from(process.env.HSHIN_IV_BYTES, 'utf8');
            const algorithm = process.env.ALGORITHM_ENCRYPT;
            let decryptedPassword = this.decrypt(encryptedPassword, algorithm, key, iv);
            return decryptedPassword === password;
        } catch (error) {
            console.error(error);
            throw new Error('Error verifying password');
        }
    }
    decrypt(encryptedText, algorithm, key, iv) {
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    async register (json){
        const iv = Buffer.from(process.env.HSHIN_IV_BYTES,"utf8");
        const key = Buffer.from(process.env.HSHING_PASSWORD_SECRET,'utf8');
        const algorithm = process.env.ALGORITHM_ENCRYPT;
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const notHashedPassword = json.password;
        let encryptedPassword = cipher.update(notHashedPassword,'utf-8','hex');
        encryptedPassword += cipher.final('hex');
        json['password'] = encryptedPassword;
        const jsonToInsert = {
            'internal_axon_id':uuid(),
            'is_approved':false,

            'LoginProperty':json
        }
        const results = await axios.post('http://localhost:3000/dbRouter/db/insert',
            jsonToInsert,{headers:{
                'collection':'User_login',
                'db':'Users',
                'x_inf_token':this.tokenService.generateAccessToken(json)
        }});
        await sendSuccessfullyRegisterUser(jsonToInsert);
        if(results.status === 200){
            return true;
        }
    }
}

export default LoginService;
