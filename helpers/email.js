import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import emailConfig from '../config/email.js';

let mailConfig;
if (process.env.NODE_ENV === "production") {
    const options = {
        apiKey: emailConfig.SENDGRID_API_SECRET
    };
    mailConfig = nodemailerSendgrid(options);
}else{
    mailConfig={
        host: emailConfig.MAIL_HOST,
        port: emailConfig.MAIL_PORT,
        auth: {
            user: emailConfig.MAIL_USER,
            pass: emailConfig.MAIL_PASS,
        },
    };
}

const transporter = nodemailer.createTransport(mailConfig)
transporter.verify().then(() => {
    console.log('Ready for send emails');
});

const sendMail = async (options) => {
    const optionsMail = {
        from: `${options.subject} <${emailConfig.EMAIL}>`,
        to: options.user.email,
        subject: options.subject,
        html: options.html,
    };

    // send mail with defined transport object
    return await transporter.sendMail(optionsMail)
};

export default sendMail;