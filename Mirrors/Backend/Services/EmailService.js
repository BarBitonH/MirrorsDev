import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import path from "path";

dotenv.config({path: path.resolve('C:\\Users\\Admin\\WebstormProjects\\MirrorsDev\\secrets.env')});
// Send a recovery email
export async function sendRecoveryEmail(userEmail) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // use true if you want to use port 465
            auth: {
                user: process.env.EMAIL_RECOVERY_USER,
                pass: process.env.EMAIL_RECOVERY_PASSWORD,
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        const mailOptions = {
            from:  process.env.EMAIL_RECOVERY_USER,
            to: userEmail,
            subject: 'Password Recovery',
            text: 'Please follow the link to recover your password: [RECOVERY_LINK]',
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Recovery email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending recovery email:', error);
        throw new Error('Failed to send recovery email');
    }
}
export async function sendSuccessfullyRegisterUser(json){
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // use true if you want to use port 465
            auth: {
                user: process.env.EMAIL_CONFIRMATION_USER,
                pass: process.env.EMAIL_CONFIRMATION_PASSWORD,
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });
        const timestamp = `${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()} ${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`;
        const mailOptions = {
            from: process.env.EMAIL_CONFIRMATION_USER,
            to: process.env.AMIT_MAIL,
            subject: 'Congratulation Bar new user was created !!!',
            text:
                'Hi Bar,\n' +
                'We would like to inform you that a new user has registered to Mirrors. Here are the user details:\n' +
                'Date of registration :' + timestamp + ',\n'+
                '- Name: ' + json.LoginProperty.fullName + ',\n' +
                '- Email: ' + json.LoginProperty.email + '\n' +
                'Best Regards,\n' +
                'Mirrors Automation Protocol'
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Recovery email sent:', info.messageId);
    }
    catch (error){
        console.error('Error sending recovery email:', error);
        throw new Error('Failed to send recovery email');
    }

}
export default sendRecoveryEmail;


/* ReadMe :

This code is a module that exports two functions:

sendRecoveryEmail and sendSuccessfullyRegisterUser.

Both functions are used to send emails using the nodemailer package.

The dotenv package is used to load environment variables from a .env file.

sendRecoveryEmail(userEmail): This function is used to send a password recovery email.

It takes a single argument userEmail, which is the email address of the user who has requested password recovery.

The function creates a nodemailer transporter with the SMTP server details and authentication credentials specified in the environment variables.

It then sends an email to the user with a recovery link.

sendSuccessfullyRegisterUser(json): This function is used to send a notification email when a new user registers.

It takes a single argument json, which is an object containing the details of the newly registered user.

The function creates a nodemailer transporter similar to the sendRecoveryEmail function.

It then sends an email to a specified email address (in this case, process.env.AMIT_MAIL) with the details of the new user.

The dotenv.config() function is used to load environment variables from a .env file located at the specified path.

These environment variables include the SMTP server details and the email addresses and passwords used for sending the emails.

In both functions, if the email sending fails for any reason, an error is logged to the console and an Error is thrown with the message Failed to send recovery email.

Please note that this code uses environment variables for sensitive data such as email addresses and passwords.

Make sure to set these environment variables in your .env file and never include sensitive data directly in your code. */