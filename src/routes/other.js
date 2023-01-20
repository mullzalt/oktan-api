const { CrudController } = require('../controllers/Controller')
const { fileUploader } = require('../middlewares/fileUpload')
const { findByParam } = require('../middlewares/paramsMiddelware')

const router = require('express').Router()

const user = new CrudController('User')

router.route('/users').get(
    user.getAll({
        include: [{ model: 'Profile', attributes: { exclude: ['id'] }, nested: false }],
        searchParam: [
            'username', 'email',
            '$user_profile.name$', '$user_profile.phone$', '$user_profile.institute$'
        ],
        otherParam: [
            { attribute: 'verified', query: 'verified', isBool: true },
            { attribute: 'roles', query: 'role' },
        ], 
        orders: [
            {model: 'User', attributes: ['username', 'email']},
            {model: 'Profile', attributes: ['name', 'phone', 'institute']},
        ]
    })
)

router.route('/users/:userId').get(
    user.getByParam({
        where: [
            {attribue: 'id', param: 'userId'},
            {attribue: 'username', param: 'userId'},
        ], 
        include: [{ model: 'Profile', attributes: { exclude: ['id'] }, nested: false }],
    })
)

const cbt = new CrudController('Cbt')

router.route('/cbts').post(
    fileUploader,
    cbt.post({upload: {attribute: 'imgUrl', destination: 'cbt', includeId: true}})
)

router.route('/cbts/:cbtId')
.put(
    fileUploader,
    cbt.put({upload: {attribute: 'imgUrl', destination: 'cbt', includeId: true}, param: 'cbtId'})
)
.delete(
    cbt.delete({param: 'cbtId', attribute: 'title'})
)


module.exports = router

