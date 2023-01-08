const router = require('express').Router()

const { user } = require('../controllers')


router.route('/').get(
    user.getUsers
)


module.exports = router