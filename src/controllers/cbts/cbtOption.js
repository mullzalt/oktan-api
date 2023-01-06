const asyncHandler = require("express-async-handler");

const { CbtOption, Cbt, CbtQuestion } = require("../../db");

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

const createOption = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)

    const { option, imgUrl } = req.body

    const newOption = await CbtOption.create({
        option,
        imgUrl,
        questionId: question.id
    })

    res.status(201)
    res.json({
        message: 'Option created'
    })
})

const updateOption = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)

    const { option, imgUrl } = req.body


    const { optionId } = req.params

    const optionData = await CbtOption.findOne({
        where: {
            id: optionId,
            questionId: question.id
        }
    })

    if (!optionData) {
        res.status(404)
        throw new Error('Option not found!')
    }

    await optionData.update({
        option,
        imgUrl
    })

    res.status(200)
    res.json({
        message: 'Option updated'
    })
})

const deleteOption = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)


    const { optionId } = req.params

    const optionData = await CbtOption.findOne({
        where: {
            id: optionId,
            questionId: question.id
        }
    })

    if (!optionData) {
        res.status(404)
        throw new Error('Option not found!')
    }

    await optionData.destroy()

    res.status(200)
    res.json({
        message: 'Option deleted'
    })
})

const getOptions = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)


    const options = await CbtOption.findAll({
        where: {
            questionId: question.id
        }
    })


    res.status(200)
    res.json(options)
})

const getOptionsById = asyncHandler(async (req, res) => {
    const { cbt, question } = await checkQuestion(req, res)

    const { optionId } = req.params

    const optionData = await CbtOption.findOne({
        where: {
            id: optionId,
            questionId: question.id
        }
    })

    res.status(200)
    res.json(optionData)
})



module.exports = {
    createOption,
    updateOption,
    deleteOption,
    getOptions,
    getOptionsById
}