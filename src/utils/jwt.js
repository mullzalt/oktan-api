const jwt = require("jsonwebtoken")

const generateJwt = (payload, options = undefined) => {
    const secret_key = process.env.JWT_SECRET || 'secretKey'
    const option = options ? options : { expiresIn: '30m' }

    return jwt.sign(payload, secret_key, option)
}

module.exports = {
    generateJwt
}