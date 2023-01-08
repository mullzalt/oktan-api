const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { User } = require("../../db");
const { generateJwt } = require("../../utils/jwt");
const secret_key = process.env.JWT_SECRET || 'secert_key'

const refresh = asyncHandler(async (req, res) => {
    const cookies = req.cookies

    if (!cookies?.refreshToken){
        res.status(403)
        throw new Error('Unauthorized')
    } 

    const refreshToken = cookies.refreshToken

    const decoded = jwt.verify(refreshToken, secret_key, (err, decoded) => {
        if(err){
            res.status(401)
            throw err
        }

        return decoded
    })

    const user = await User.findOne({
        where: {id: decoded.id}
    })

    if(!user){
        res.status(403)
        throw new Error('Unauthorized')
    }

    const accessToken = generateJwt({id: user.id})

    res.status(200)
    res.json({accessToken})
    return
})

module.exports = refresh

