const asyncHandler = require("express-async-handler");
const { Cbt, CbtQuestion, CbtOption } = require("../../db");

const checkCbt = async (req, res) => {
    const { cbtId } = req.params
    const cbt = await Cbt.findByPk(cbtId)

    if (!cbt) {
        res.status(404)
        throw new Error('Cbt not found')
    }

}

const createQuestion = asyncHandler(async (req, res) => {
    await checkCbt(req, res)

    const { question, imgUrl } = req.body
    const { cbtId } = req.params

    if (!question) {
        res.status(422)
        throw new Error("Please enter a question")
    }

    const cbtQuestion = await CbtQuestion.create({
        question,
        imgUrl,
        cbtId
    })

    res.status(201)
    res.json({
        message: 'Question created',
    })
    return
})

const getQuestions = asyncHandler(async (req, res) => {
    await checkCbt(req, res)

    const { cbtId } = req.params

    const questions = await CbtQuestion.findAll({
        where: { cbtId: cbtId },
        include: [
            { model: CbtOption, as: 'options' }
        ]
    })

    res.status(200)
    res.json(questions)
    return
})

const updateQuestion = asyncHandler(async (req, res) => {
    await checkCbt(req, res)

    const { question, imgUrl } = req.body
    const { questionId } = req.params

    const questionData = await CbtQuestion.findByPk(questionId)

    if (!questionData) {
        res.status(404)
        throw new Error('Question not found!')
    }

    await questionData.update({
        question,
        imgUrl
    })

    res.status(200)
    res.json({
        message: 'Question updated'
    })
    return
})

const deleteQuestion = asyncHandler(async (req, res) => {
    await checkCbt(req, res)

    const { questionId } = req.params

    const questionData = await CbtQuestion.findByPk(questionId)

    if (!questionData) {
        res.status(404)
        throw new Error('Question not found!')
    }

    await questionData.destroy()

    res.status(200)
    res.json({
        message: 'Question deleted'
    })
    return
})

const getQuestionById = asyncHandler(async (req, res) => {
    await checkCbt(req, res)

    const { questionId } = req.params

    const questionData = await CbtQuestion.findByPk(questionId)

    if (!questionData) {
        res.status(404)
        throw new Error('Question not found!')
    }

    res.status(200)
    res.json(questionData)
    return
})

module.exports = {
    createQuestion,
    getQuestions,
    updateQuestion,
    getQuestionById,
    deleteQuestion
}