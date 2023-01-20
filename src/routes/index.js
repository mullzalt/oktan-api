const router = require('express').Router()

router.use('/', require('./auth'))
router.use('/cbts', require('./cbt'))
router.use('/tests', require('./cbtTest'))
router.use('/users', require('./users'))
router.use('/other', require('./other'))

module.exports = router