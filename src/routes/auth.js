const router = require('express').Router()

const { login, refresh, register, verifyAccount, resendMail, getMe } = require('../controllers')
const { validateJwt } = require('../middlewares/jwtValidation')
const { validateLogin, validateRegister } = require('../middlewares/validation')


router.route('/login').post(
    validateLogin,
    login
)

router.route('/me').get(
    validateJwt,
    getMe,
)

router.route('/register').post(
    validateRegister,
    register
)

router.route('/refresh').get(
    refresh
)

router.route('/validation/:userId/verify/:token').get(
    verifyAccount
)

router.route('/validation/:userId/resend').post(
    resendMail
)

module.exports = router