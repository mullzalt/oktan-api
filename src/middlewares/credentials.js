const allowedOrigins = require('../configs/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
        res.setHeader('Cross-origin-Opener-Policy', 'same-site');
        res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    }
    next();
}

module.exports = credentials