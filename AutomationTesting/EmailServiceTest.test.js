import { sendRecoveryEmail, sendSuccessfullyRegisterUser } from '../Mirrors/Backend/Services/EmailService.js';
import Logger from './TestLogs.js';

const logger = new Logger();
logger.createLogFile();

describe('Email Sending', () => {
    it('sends a recovery email', async () => {
        try {
            await sendRecoveryEmail('bitonbarr10@gmail.com');
            logger.log('sends a recovery email : Passed');
        } catch (err) {
            console.error('Failed to send recovery email to test@example.com:', err.message);
            logger.log('sends a recovery email : Failed');
        }
    });

    it('fails to send a recovery email with invalid email', async () => {
        try {
            await sendRecoveryEmail('invalid-email');
            logger.log('sends a recovery email with invalid email : Failed');
        } catch (err) {
            console.error('Correctly failed to send recovery email to invalid-email:', err.message);
            logger.log('sends a recovery email with invalid email : Passed');
        }
    });


    it('sends a registration confirmation email', async () => {
        const userData = {
            LoginProperty: {
                fullName: 'John Doe',
                email: 'bitonbarr10@gmail.com',
            },
        };

        try {
            await sendSuccessfullyRegisterUser(userData);
            console.log('Registration confirmation email sent successfully.');
            logger.log('sends a recovery email : Passed');
        } catch (err) {
            console.error('Failed to send registration confirmation email:', err.message);
            logger.log('sends a recovery email : Failed');
        }
    });
    it('fails to send a registration confirmation email with missing fields', async () => {
        const incompleteUserData = {
            LoginProperty: {
                // Missing fullName and email
            },
        };

        try {
            await sendSuccessfullyRegisterUser(incompleteUserData);
            console.log('Failed: should not send a confirmation email with missing fields.');
            logger.log('sends a registration confirmation email with missing fields : Failed');
        } catch (err) {
            console.error('Correctly failed to send registration confirmation email with missing fields:', err.message);
            logger.log('sends a registration confirmation email with missing fields : Passed');
        }
    });
    it('fails to send a registration confirmation email with invalid email', async () => {
        const userDataWithInvalidEmail = {
            LoginProperty: {
                fullName: 'John Doe',
                email: 'invalid-email',
            },
        };

        try {
            await sendSuccessfullyRegisterUser(userDataWithInvalidEmail);
            console.log('Failed: should not send a confirmation email with invalid email.');
            logger.log('sends a registration confirmation email with invalid email : Failed');
        } catch (err) {
            console.error('Correctly failed to send registration confirmation email with invalid email:', err.message);
            logger.log('sends a registration confirmation email with invalid email : Passed');
        }
    });
});
