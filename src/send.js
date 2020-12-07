const readSettings = require("./settings");
const nodemailer = require("nodemailer");

const send = (subject, text) => {
    const settings = readSettings.read();

    const transporter = nodemailer.createTransport({
        host: settings.smtp.server,
        port: settings.smtp.port,
        secure: false,
        auth: {
            user: settings.smtp.username,
            pass: settings.smtp.password,
        },
    });

    return transporter.sendMail({
        from: settings.smtp.from,
        to: settings.recipients.join(', '),
        subject,
        text,
    });
}

module.exports = send;
