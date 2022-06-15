import dotenv from 'dotenv';
dotenv.config();

export default {
    MAIL_USER: process.env.MAIL_USER,
    MAIL_PASS: process.env.MAIL_PASS,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    SENDGRID_API_SECRET:process.env.SENDGRID_API_SECRET,
    EMAIL:process.env.EMAIL,
};