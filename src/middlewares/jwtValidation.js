const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const User = require('../db/models/User')
const secret_key = process.env.JWT_SECRET || 'secret_Key'

const validateJwt = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        res.status(401)
        throw new Error('No token provided!')
    }

    const decoded = jwt.verify(token, secret_key, (err, decoded) => {
        if(err){ 
            res.status(401)
            throw err
        }

        return decoded
    })

    const user = await User.findByPk(decoded.id, {
        attributes: ['id']
    })

    if(!user){
        res.status(401)
        throw new Error('You are using invalid token, please login again!')
    }

    req.user = user

    next()
})

module.exports = {
    validateJwt
}