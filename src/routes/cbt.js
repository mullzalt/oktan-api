const { CrudController } = require('../controllers/Controller')
const { fileUploader } = require('../middlewares/fileUpload')
const { validateJwt } = require('../middlewares/jwtValidation')
const { findByParam } = require('../middlewares/paramsMiddelware')
const { validateCbt } = require('../middlewares/validation')

const router = require('express').Router()

const cbtController = new CrudController('Cbt')

router.route('/')
    .post(
        validateJwt,
        fileUploader,
        cbtController.post({upload: {attribute: 'imgUrl', destination: 'cbt', includeId: true}})
    )
    .get(   
        validateJwt,
        cbtController.getAll({
            searchParam: ['title'],
            otherParam: [
                { attribute: 'archived', query: 'archived', isBool: true },
            ], 
            orders: [
                {model: 'Cbt', attributes: ['title', 'startDate', 'endDate', 'createdAt']},
            ], 
            include: [{
                model: 'CbtQuestion', nested: false
            }]
        })
    )

router.route('/:cbtId')
    .put(
        validateJwt,
        fileUploader,
        cbtController.put({upload: {attribute: 'imgUrl', destination: 'cbt', includeId: true}, param: 'cbtId'})
    )
    .get(
        validateJwt,
        cbtController.getByParam({where: [
            {attribue: 'id', param: 'cbtId'}
        ]})
    )
    .delete(
        validateJwt,
        cbtController.delete({param: 'cbtId', attribute: 'title'})
    )


// const cbtRequiremnetController = new CrudController('CbtRequirement')

// router.route('/:cbtId/requirements').post(
//     validateCbt, 
//     cbtRequiremnetController.upsert({
//         parents: [
//             {param: 'cbtId', attribute: 'cbtId'}
//         ]
//     })
// )

const questionController = new CrudController('CbtQuestion')

router.route('/:cbtId/questions')
    .get(
        validateJwt,
        findByParam({table: 'Cbt', where: [
            {attribute: 'id', param: 'cbtId'}
        ]}),
        questionController.getAll({
            include: [{model: 'CbtOption', as: 'options', nested: false}],
            searchParam: ['question'],
            parentParam: [{
                attribute: 'CbtId', param: 'cbtId'
            }],
            otherParam: [
                { attribute: 'startDate', query: 'startDate', isBool: false },
            ], 
        })
    )
    .post(
        validateJwt,
        findByParam({table: 'Cbt', where: [
            {attribute: 'id', param: 'cbtId'}
        ]}),
        fileUploader,
        questionController.post({
            upload: {paramId: 'cbtId', destination: 'cbt', attribute: 'imgUrl'},
            parent: {param: 'cbtId', attribute: 'cbtId'}
        })
    )

router.route('/:cbtId/questions/:questionId')
    .get(
        validateJwt,
        questionController.getByParam({
            where: [
                {param: 'questionId', attribue: 'id'},
                {param: 'cbtId', attribue: 'cbtId', isRequired: true},
            ], 
            include: [{model: 'CbtOption', as: 'options'}]
        })
    )
    .put(
        validateJwt,
        fileUploader, 
        questionController.put({upload: {paramId: 'cbtId', destination: 'cbt', attribute: 'imgUrl'}, param: 'questionId'})
    )
    .delete(
        validateJwt,
        questionController.delete({param: 'questionId', attribute: 'question'})
    )


const optionController = new CrudController('CbtOption')

router.route('/:cbtId/questions/:questionId/options')
    .get(
        validateJwt,
        optionController.getAll({
            searchParam: ['option'],
            parentParam: [{
                attribute: 'questionId', param: 'questionId'
            }],
        })
    )
    .post(
        validateJwt,
        findByParam({table: 'CbtQuestion', where: [
            {attribute: 'id', param: 'questionId'},
            {attribute: 'cbtId', param: 'cbtId'},
        ]}),
        fileUploader,
        optionController.post({
            upload: {paramId: 'cbtId', destination: 'cbt', attribute: 'imgUrl'},
            parent: {attribute: 'questionId', param: 'questionId'}
        })
    )

router.route('/:cbtId/questions/:questionId/options/:optionId')
    .get(
        validateJwt,
        optionController.getByParam({
            where: [
                {param: 'questionId', attribue: 'questionId', isRequired: true},
                {param: 'optionId', attribue: 'id'}
            ]
        })
    )
    .put(
        validateJwt,
        fileUploader,
        optionController.put({
            param: 'optionId',
            upload:{paramId: 'cbtId', destination: 'cbt', attribute: 'imgUrl'},
        })
    )
    .delete(
        validateJwt,
        optionController.delete({
            param: 'optionId', attribute: 'option'
        })
    )


module.exports = router