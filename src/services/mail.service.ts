import nodemailer from 'nodemailer';
import {User} from "../entities/User";
import {EMAIL, EMAIL_PASSWORD} from "../constants/constants";

/**
 * Send email to user with confirmation code
 * with amazing content and html template :)
 * TODO: Add html template to email
 * @param user
 * @returns {Promise<void>}
 * **/
export const sendEmail = async (user: User) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PASSWORD,
            },
        });
        const info = await transporter.sendMail({
            from: EMAIL,
            to: user.person.email,
            subject: "Confirm your email",
            text: "Confirm your email",
            html: `<b>Confirm your email</b>
                    <p>Click on the following link to confirm your email</p>
                    <a href="http://localhost:8080/auth/verify/${user.id}/${user.confirmationCode}">${user.confirmationCode}</a> 
                   <p>Or copy and paste the following code in the confirmation code field,
                    the code have expriation 24 hours</p>`,
        });
        console.info("Message sent: %s", info.messageId);
    } catch (e) {
        throw new Error("Error sending email")
    }
}