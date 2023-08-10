import { sendRecoveryEmail, sendSuccessfullyRegisterUser } from '../Mirrors/Backend/Services/EmailService.js';

describe('Email Sending', () => {

    it('sends a recovery email', async () => {
        try {
            await sendRecoveryEmail('test@example.com');
            console.log('Recovery email sent successfully to test@example.com');
        } catch (err) {
            console.error('Failed to send recovery email to test@example.com:', err.message);
        }
    });

    it('sends a registration confirmation email', async () => {
        const userData = {
            LoginProperty: {
                fullName: 'John Doe',
                email: 'john@example.com',
            },
        };

        try {
            await sendSuccessfullyRegisterUser(userData);
            console.log('Registration confirmation email sent successfully.');
        } catch (err) {
            console.error('Failed to send registration confirmation email:', err.message);
        }
    });
});
