const router = require('express').Router()

const { CrudController } = require('../controllers/Controller')
const { fileUploader } = require('../middlewares/fileUpload')
const { validateJwt } = require('../middlewares/jwtValidation')
const { findByParam } = require('../middlewares/paramsMiddelware')

const user = new CrudController('User')

router.route('/').get(
    validateJwt,
    user.getAll({
        include: [{ model: 'Profile', nested: false }],
        searchParam: [
            'username', 'email',
            '$user_profile.name$', '$user_profile.phone$', '$user_profile.institute$'
        ],
        otherParam: [
            { attribute: 'verified', query: 'verified', isBool: true },
            { attribute: 'roles', query: 'role' },
        ], 
        orders: [
            {model: 'User', attributes: ['username', 'email', 'roles']},
            {model: 'Profile', attributes: ['name', 'phone', 'institute']},
        ]
    })
)

router.route('/:userId')
.get(
    validateJwt,
    user.getByParam({
        where: [
            {attribue: 'id', param: 'userId'},
            {attribue: 'username', param: 'userId'},
        ], 
        include: [{ model: 'Profile', nested: false }],
    })
)
.put(user.put({param: 'userId', allowedBody: ['verified', 'roles']}))

const profile = new CrudController('Profile')

router.route('/:userId/profile/:profileId').put(
    validateJwt,
    fileUploader,
    profile.put({
        param: 'profileId',
        upload: {destination: 'users/avatar', attribute: 'avatar'}, 
    })
)


module.exports = router