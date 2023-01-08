const { User, VerificationToken, Profile } = require("../../db")
const crypto = require('crypto')


const generateVerificationToken = async (id) => {
    return await VerificationToken.create({
        token: crypto.randomBytes(32).toString('hex'),
        userId: id
    })
        .then(token => { return token })
        .catch(err => {
            err.status = 500
            throw err
        })
}


const mailDataHandler = async (UserId) => {
    try {
        if (!UserId) {
            const err = Error('No user provided!')
            err.status = 422
            throw err
        }
    
        const user = await User.findOne({
            where: { id: UserId },
            include: [{ model: Profile, attributes: ['name'] }]
        })
    
        if (!user) {
            const err = new Error('User not found.')
            err.status = 404
            throw err
        }
    
        if (user.verified === true) {
            const err = new Error('User already verified.')
            err.status = 400
            throw err
        }
    
        const token = await VerificationToken.findOne({
            where: { userId: user.id }
        })

        let tokenToSend

        if (token) {
            tokenToSend = token.token
        } else {
            let newToken = await generateVerificationToken(UserId)
            tokenToSend = newToken.token
        }

        const data = {
            type: 'VERIFICATION',
            name: user.user_profile.name,
            email: user.email,
            username: user.username,
            token: tokenToSend,
            subject: "Validasi akun Oktan ITB 2023",
            link: `${process.env.BASE_URL}v2/validation/${user.id}/verify/${tokenToSend}`
        }

        return data

    } catch (error) {
        error.status = 500
        throw error
    }
}

module.exports = mailDataHandler