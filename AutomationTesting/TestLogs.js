import winston from 'winston';
import fs from 'fs';
import path from 'path';

class Logger {
    constructor() {
        this.logsDir = './QAlogs';
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir);
        }
        this.createLogFile();
    }
    createLogFile() {
        const filename = this.getFormattedTimestamp() + 'QAtesting.log';
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.simple(),
            transports: [
                new winston.transports.File({ filename: path.join(this.logsDir, filename) })
            ]
        });
    }
    getFormattedTimestamp() {
        const date = new Date();
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
    log(message) {
        this.logger.info(message);
    }
}

