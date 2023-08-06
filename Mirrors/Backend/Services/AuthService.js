// AuthService.js
import jwt from 'jsonwebtoken';

class AuthService {
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            throw new Error('Invalid access token');
        }
    }
    verifyAccessUrl(req,expectedReferer){
        const headers = req.headers;
        return headers.referer === expectedReferer;
    }
    encrypt(input_string) {
        const cipher = crypto.createCipheriv(process.env.ALGORITHM, process.env.HASHING_URL_SECRET, process.env.IV);
        let encrypted = cipher.update(input_string, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    decrypt(encrypted_string, secret) {
        const decipher = crypto.createDecipheriv(process.env.ALGORITHM, process.env.HASHING_URL_SECRET, process.env.IV);
        let decrypted = decipher.update(encrypted_string, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
export default AuthService;
