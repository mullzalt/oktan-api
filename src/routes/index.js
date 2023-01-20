const router = require('express').Router()

router.use('/', require('./auth'))
router.use('/cbts', require('./cbt'))
router.use('/users', require('./users'))
router.use('/users', require('./cbtTest'))
router.use('/other', require('./other'))

module.exports = router