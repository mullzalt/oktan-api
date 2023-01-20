const { checkAnswer } = require('../controllers/CbtController')
const { CrudController } = require('../controllers/Controller')
const { fileUploader } = require('../middlewares/fileUpload')
const { validateJwt } = require('../middlewares/jwtValidation')
const { findByParam } = require('../middlewares/paramsMiddelware')
const { validateCbt } = require('../middlewares/validation')

const router = require('express').Router()

const   cbtMemberController = new CrudController('CbtMember')
router.route('/:userId/cbts').get(
    validateJwt, 
    cbtMemberController.getAll({
        searchParam: ['userId'],
        parentParam: [
            {attribute: 'userId', param: 'userId'}
        ]
    })
)


router.route('/:userId/cbts/:cbtId').post(
    validateJwt, 
    cbtMemberController.upsert({
        parents: [
            {attribute: 'userId', param: 'userId'}, 
            {attribute: 'cbtId', param: 'cbtId'}
        ], 
        where: [
            {param: 'userId', attribute: 'userId'},
            {param: 'cbtId', attribute: 'cbtId'},
        ]
    })
)

const memberAnswer = new CrudController('CbtMemberAnswer')

router.route('/:userId/cbts/:cbtId/answers/:memberId').get(
    validateJwt, 
    memberAnswer.getAll({
          searchParam: ['memberId'],
        parentParam: [
            {attribute: 'memberId', param: 'memberId'},
            {attribute: 'cbtId', param: 'cbtId'},
        ]
    })
)


router.route('/:userId/cbts/:cbtId/answers/:memberId/questions/:questionId').post(
    validateJwt, 
    memberAnswer.upsert({
        parents: [
            {attribute: 'memberId', param: 'memberId'},
            {attribute: 'questionId', param: 'questionId'},
        ], 
        where: [
            {param: 'memberId', attribute: 'memberId'},
            {param: 'questionId', attribute: 'questionId'},
        ]
    })
)


const questionController = new CrudController('CbtQuestion')

router.route(':userId/cbts/:cbtId/questions')
    .get(
        validateJwt,
        findByParam({table: 'Cbt', where: [
            {attribute: 'id', param: 'cbtId'}
        ]}),
        questionController.getAll({
            include: [{model: 'CbtOption', as: 'options', nested: false, attributes: {exclude: ['isAnswer']}}, ],
            searchParam: ['question'],
            parentParam: [{
                attribute: 'CbtId', param: 'cbtId'
            }],
            otherParam: [
                { attribute: 'startDate', query: 'startDate', isBool: false },
            ], 
            randomSort: true
        })
    )


module.exports = router