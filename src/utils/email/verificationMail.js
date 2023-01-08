const nodeMailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const EMAIL = {
    HOST: process.env.MAIL_HOST,
    SERVICE: process.env.MAIL_SERVICE, 
    PORT: process.env.MAIL_PORT, 
    SECURE: process.env.MAIL_SECURE,
    USER: process.env.MAIL_USER,
    PASS: process.env.MAIL_PASS
}


const verificationMail = async (payload) => {

    const { name, username, link, email, subject } = payload

    const filePath = path.join(__dirname, '..', 'templates', 'verification.html')
    const source = fs.readFileSync(filePath, 'utf-8')
    const template = handlebars.compile(source)
    const logoPath = path.join(__dirname, '..', '..', '..', `/public/img/logo.png`)

    const replacement = {
        name: name,
        username: username,
        link: link,
    }

    const htmlToSend = template(replacement)

    try {
        const transporter = nodeMailer.createTransport({
            host: EMAIL.HOST,
            service: EMAIL.SERVICE,
            port: EMAIL.PORT,
            secure: true,
            auth: {
                user: EMAIL.USER,
                pass: EMAIL.PASS
            },
            from: `OKTAN ITB 2023 <${EMAIL.USER}>`
        })

        return await transporter.sendMail({
            from: `OKTAN ITB 2023 <${EMAIL.USER}>`,
            to: email,
            subject: subject,
            attachments: [{
                filename: 'logo.png',
                path: logoPath,
                cid: 'logo'
            }],
            html: htmlToSend,
        })
    } catch (error) {
        throw error
    }
}

module.exports = verificationMail