const { postRequest, CrudController } = require('../controllers/Controller')
const { findByParam } = require('../middlewares/paramsMiddelware')

const router = require('express').Router()

const cbt = new CrudController('User')

router.route('/:cbtId/questions/:questionId').get(
    cbt.getAll({
        include: [{ model: 'Profile', attributes: { exclude: ['id'] }, nested: false }],
        searchParam: [
            'username', 'email',
            '$user_profile.name$', '$user_profile.phone$', '$user_profile.institute$'
        ],
        otherParam: [
            { attribute: 'verified', query: 'verified', isBool: true },
            { attribute: 'roles', query: 'role' },
        ]
    })
)

module.exports = router

