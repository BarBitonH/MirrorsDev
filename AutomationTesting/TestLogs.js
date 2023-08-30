import winston from 'winston';
import fs from 'fs';
import path from 'path';

class Logger {
    constructor() {
        this.logsDir = './QAlogs'; // change path to relative
        try {
            if (!fs.existsSync(this.logsDir)) {
                fs.mkdirSync(this.logsDir);
            }
            this.createLogFile();
        } catch (err) {
            console.error('Logger Initialization Error:', err.message);
        }
    }
    createLogFile() {
        const filename = this.getFormattedTimestamp() + 'QAtesting.log';
        try {
            this.logger = winston.createLogger({
                level: 'info',
                format: winston.format.simple(),
                transports: [
                    new winston.transports.File({ filename: path.join(this.logsDir, filename) })
                ]
            });
        } catch (err) {
            console.error('Log File Creation Error:', err.message);
        }
    }
    getFormattedTimestamp() {
        const date = new Date();
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
    }
    log(message) {
        this.logger.info(message);
    }
}

export default Logger;
