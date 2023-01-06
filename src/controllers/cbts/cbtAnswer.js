const asyncHandler = require("express-async-handler");

const { CbtOption, Cbt, CbtQuestion, CbtAnswer } = require("../../db");

const checkQuestion = async (req, res) => {
    const { cbtId, questionId } = req.params

    if (!cbtId || !questionId) {
        res.status(422)
        throw new Error('Enter the ids!')
    }

    const cbt = await Cbt.findByPk(cbtId)

    if (!cbt) {
        res.status(404)
        throw new Error('Cbt not found!')
    }

    const question = await CbtQuestion.findOne({
        where: {
            cbtId: cbtId,
            id: questionId
        }
    })

    if (!question) {
        res.status(404)
        throw new Error('Question not found!')
    }

    return { cbt, question }
}

const createAnswer = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)

    const { optionId } = req.body

    const setAnswer = await CbtAnswer.create()

    res.status(201)
    res.json({
        message: 'Option created'
    })
})


module.exports = {
}