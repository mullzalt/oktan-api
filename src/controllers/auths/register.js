const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const verificationMail = require('../../utils/email/verificationMail')
const { User, Profile } = require('../../db')
const mailDataHandler = require('./mailSender')

const register = asyncHandler(async(req, res) =>{
    const { username, email, password } = req.body
    const { name, institute, phone } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        username,
        email: email,
        password: hashedPassword
    })

    const profile = await Profile.create({
        name,
        phone,
        institute,
        userId: user.id
    })

    const mailData = await mailDataHandler(user.id)

    const sendMail = await verificationMail(mailData)
    

    res.status(200)
    return res.json({
        message: 'Register account successfull!'
    })
})


module.exports = register