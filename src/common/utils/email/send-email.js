import nodemailer from 'nodemailer';
import { EMAIL, EMAIL_PASSWORD } from '../../../../config/config.service.js';


export const sendEmail = async ({ to, subject, html } = {}) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: EMAIL_PASSWORD
        }
    })

    await transporter.sendMail({
        from: `"SARAHA APP" <${EMAIL}>`,
        to,
        subject,
        html
    })

}