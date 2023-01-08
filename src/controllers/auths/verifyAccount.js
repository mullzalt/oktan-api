const asyncHandler = require('express-async-handler');
const { User, VerificationToken } = require('../../db')


const WEB_URL = process.env.WEB_URL

const verifyAccount = asyncHandler(async(req, res) =>{
    const {userId, token} = req.params

    const user = await User.findOne({
        where: { id: req.params.userId }
    })

    if (!user) {
        res.status(404)
        throw new Error('User not found')
    }

    if (user.verified) {
        return res.redirect(302, `${WEB_URL}login`)
    }

    const verifyToken = await VerificationToken.findOne({
        where: {
            token: req.params.token,
            userId: req.params.userId
        }
    })

    if (!verifyToken) {
        res.status(422)
        throw new Error('Token not valid!')
    }

    await user.update({ verified: true })
        .then(async () => {
            await user.save()
            await verifyToken.destroy()

            return res.redirect(302, `${WEB_URL}authentication/verified?username=${user.username}`)
        })
        .catch((err) => {
            res.status(500)
            throw err
        })
})

module.exports = {verifyAccount}