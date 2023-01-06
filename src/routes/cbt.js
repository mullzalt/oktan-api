const { cbt, cbtQuestion, cbtOption } = require('../controllers')
const { validateCbt } = require('../middlewares/validation')

const router = require('express').Router()

router.route('/')
    .post(validateCbt, cbt.createCbt)
    .get(cbt.getCbts)

router.route('/:cbtId')
    .put(validateCbt, cbt.updateCbt)
    .get(cbt.getCbtById)
    .delete(cbt.deleteCbt)

router.route('/:cbtId/questions')
    .get(cbtQuestion.getQuestions)
    .post(cbtQuestion.createQuestion)

router.route('/:cbtId/questions/:questionId')
    .get(cbtQuestion.getQuestionById)
    .put(cbtQuestion.updateQuestion)
    .delete(cbtQuestion.deleteQuestion)

router.route('/:cbtId/questions/:questionId/options')
    .get(cbtOption.getOptions)
    .post(cbtOption.createOption)

router.route('/:cbtId/questions/:questionId/options/:optionId')
    .get(cbtOption.getOptionsById)
    .put(cbtOption.updateOption)
    .delete(cbtOption.deleteOption)


module.exports = router