require('dotenv').config()

const httpException = async (err, req, res, next) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500
    const status = err?.status ? err.status : statusCode

    const message = err.message || 'Something went wrong'
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined
    const data = err.data || undefined


    res.status(status)
    res.json({
        message,
        data,
        stack,
    })
    return
}

module.exports = {
    httpException
}