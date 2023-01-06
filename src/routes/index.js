const router = require('express').Router()

router.use('/', require('./auth'))
router.use('/cbts', require('./cbt'))

module.exports = router