const { compareSync } = require("bcrypt");
const asyncHandler = require("express-async-handler");

const { User } = require("../../db");
const { Op } = require("../../db/models");
const { generateJwt } = require("../../utils/jwt");


const login = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    const { identifier, password } = req.body

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
        throw new Error('Wrong password!')
    }

    if (!user.verified) {
        res.status(401)
        res.json({
            message: 'Please confirm your email first!',
            data: {
                email: user.email
            }
        })
        return
    }

    const accessToken = generateJwt({ id: user.id })
    const refreshToken = generateJwt({ id: user.id }, { expiresIn: '2d' })

    if (cookies?.refreshToken) {
        res.clearCookie('refreshToken');
    }

    return res.status(200)
        .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .json({
            message: 'Login Successful',
            accessToken
        })

})

module.exports = login