const router = require('express').Router()

const { login, refresh, register, verifyAccount, resendMail } = require('../controllers')
const { validateLogin, validateRegister } = require('../middlewares/validation')


router.route('/login').post(
    validateLogin,
    login
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