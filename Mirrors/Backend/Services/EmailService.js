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
            secure: false,
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
            to: process.env.BAR_MAIL,
            subject: 'Congratulation Amit new user was created !!!',
            text:
                'Hi Bar,\n' +
                'We would like to inform you that a new user has registered to Mirrors. Here are the user details:\n' +
                'Date of registration :' + timestamp + ',\n'+
                '- Name: ' + json.LoginProperty.fullName + ',\n' +
                '- Email: ' + json.LoginProperty.email + '\n' +
                'Please ensure to approve this user.\n' +
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



