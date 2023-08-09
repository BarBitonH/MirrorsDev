// TokenService.js
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import path from "path";
dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});

class TokenService {
    constructor(secretKey) {
        this.secretKey = secretKey;
        this.accessTokenExpiration = process.env.JWT_EXP_TIME;
        this.refreshTokenExpiration = process.env.JWT_REFRESH_TIME;
    }

    generateAccessToken(json) {
        return jwt.sign(json, this.secretKey, { expiresIn: this.accessTokenExpiration });
    }

    generateRefreshToken(user) {
        const payload = {
            id: user.id,
            email: user.email,
        };

        return jwt.sign(payload, this.secretKey, { expiresIn: this.refreshTokenExpiration });
    }
}

export default TokenService;
