const router = require('express').Router()

const { login } = require('../controllers')
const { validateLogin } = require('../middlewares/validation')


router.route('/login').post(
    validateLogin,
    login)

module.exports = router