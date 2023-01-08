const asyncHandler = require('express-async-handler');
const verificationMail = require('../../utils/email/verificationMail');
const mailDataHandler = require('./mailSender');

const resendMail = asyncHandler(async(req, res) =>{
    const {userId} = req.params

    const data = await mailDataHandler(userId)

    await verificationMail(data)

    res.status(200)
    res.json({
        message: 'Email has been sent'
    })
    return 
})

module.exports = {resendMail}