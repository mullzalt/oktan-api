const asyncHandler = require("express-async-handler");
const { Cbt } = require("../../db");

const createCbt = asyncHandler(async (req, res) => {
    const { title, startDate, endDate, duration } = req.body

    const cbt = await Cbt.create({
        title,
        startDate,
        endDate,
        duration
    })

    res.status(201)
    res.json({
        message: 'Cbt created',
    })
    return
})

const updateCbt = asyncHandler(async (req, res) => {
    const { title, startDate, endDate, duration } = req.body
    const { cbtId } = req.params

    const cbt = await Cbt.findOne({
        where: { id: cbtId }
    })

    if (!cbt) {
        res.status(404)
        throw new Error('Cbt not found')
    }

    cbt.update({
        title,
        startDate,
        endDate,
        duration
    })

    res.status(200)
    res.json({
        message: 'Cbt updated'
    })
    return
})

const getCbtById = asyncHandler(async (req, res) => {
    const { cbtId } = req.params

    const cbt = await Cbt.findOne({
        where: { id: cbtId }
    })

    if (!cbt) {
        res.status(404)
        throw new Error('Cbt not found')
    }

    res.status(200)
    res.json(cbt)
    return
})

const deleteCbt = asyncHandler(async (req, res) => {
    const { cbtId } = req.params

    const cbt = await Cbt.findOne({
        where: { id: cbtId }
    })

    if (!cbt) {
        res.status(404)
        throw new Error('Cbt not found')
    }

    await cbt.destroy()

    res.status(200)
    res.json({
        message: 'cbt deleted'
    })
    return
})

const getCbts = asyncHandler(async (req, res) => {
    const cbt = await Cbt.findAll()

    res.status(200)
    res.json(cbt)
    return
})



module.exports = {
    createCbt,
    updateCbt,
    getCbts,
    getCbtById,
    deleteCbt
}