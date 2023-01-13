const { compareSync } = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { User } = require("../../db");
const { Op } = require("../../db/models");
const { generateJwt } = require("../../utils/jwt");


const login = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    const { identifier, password, remember } = req.body

    const user = await User.findOne({
        where: {
            [Op.or]: [
                { username: identifier },
                { email: identifier }
            ]
        }
    })

    if (!user) {
        res.status(400)
        throw new Error('Email or Username is incorrect!')
    }

    const isPasswordMatch = await compareSync(password, user.password)

    if (!isPasswordMatch) {
        res.status(400)
        throw new Error('Password incorrect!')
    }

    if (!user.verified) {
        res.status(403)
        const err = new Error('User not verified, please confirm your email first!')
        err.data = {
            email: user.email
        }
        throw err
    }

    const expireTime = remember === true ? { expiresIn: '1y' } : { expiresIn: '2d' }
    const cookieExpire = remember === true ? { maxAge: 365 * 24 * 60 * 60 * 1000 } : { maxAge: 2 * 24 * 60 * 60 * 1000 }

    const accessToken = generateJwt({ id: user.id })
    const refreshToken = generateJwt({ id: user.id }, { ...expireTime })

    if (cookies?.refreshToken) {
        res.clearCookie('refreshToken');
    }

    return res.status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true, ...cookieExpire })
        .json({
            message: 'Login Successful',
            accessToken,
            expireTime,
            cookieExpire
        })

})

module.exports = login