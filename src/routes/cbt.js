const { cbt, cbtQuestion, cbtOption } = require('../controllers')
const { validateJwt } = require('../middlewares/jwtValidation')
const { validateCbt } = require('../middlewares/validation')

const router = require('express').Router()

router.route('/')
    .post(validateJwt,
        validateCbt, 
        cbt.createCbt
        )
    .get(
        validateJwt, 
        cbt.getCbts
        )

router.route('/:cbtId')
    .put(
        validateJwt,
        validateCbt, 
        cbt.updateCbt
        )
    .get(
        validateJwt,
        cbt.getCbtById
        )
    .delete(
        validateJwt,
        cbt.deleteCbt
        )

router.route('/:cbtId/questions')
    .get(
        validateJwt,
        cbtQuestion.getQuestions
        )
    .post(
        validateJwt,
        cbtQuestion.createQuestion
        )

router.route('/:cbtId/questions/:questionId')
    .get(
        validateJwt,
        cbtQuestion.getQuestionById
        )
    .put(
        validateJwt,
        cbtQuestion.updateQuestion
        )
    .delete(
        validateJwt,
        cbtQuestion.deleteQuestion
        )

router.route('/:cbtId/questions/:questionId/options')
    .get(
        validateJwt,
        cbtOption.getOptions
        )
    .post(
        validateJwt,
        cbtOption.createOption
        )

router.route('/:cbtId/questions/:questionId/options/:optionId')
    .get(
        validateJwt,
        cbtOption.getOptionsById
        )
    .put(
        validateJwt,
        cbtOption.updateOption
        )
    .delete(
        validateJwt,
        cbtOption.deleteOption
        )


module.exports = router