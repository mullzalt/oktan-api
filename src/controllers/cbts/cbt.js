const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");
const { Cbt } = require("../../db");
const { makePagination, paginationResults } = require("../../utils/paginate");

const createCbt = asyncHandler(async (req, res) => {
    const { title, startDate, endDate, duration, optionCount, onCorrectPoint, onNullPoint, onWrongPoint,imgUrl } = req.body

    const cbt = await Cbt.create({
        title,
        startDate,
        endDate,
        duration,
        optionCount,
        onCorrectPoint,
        onNullPoint,
        onWrongPoint,
        imgUrl
    })

    res.status(201)
    res.json({
        message: 'Cbt created',
    })
    return
})

const updateCbt = asyncHandler(async (req, res) => {
    const { title, startDate, endDate, duration, optionCount, onCorrectPoint, onNullPoint, onWrongPoint,imgUrl } = req.body
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
        duration,
        optionCount,
        onCorrectPoint,
        onNullPoint,
        onWrongPoint,
        imgUrl
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
    const {search, archived, size, page} = req.query

    const getWhere = search ? {
        [Op.or] : [
            {title: {[Op.like]: `%${search}%`}},
        ]
    } : null

    const getArchived = archived === 'false' ? {archived : false} : archived === 'true' ? {archived : true} : null

    const condition = {
        [Op.and]: [
            getWhere, 
            getArchived
        ]
    }

    const {limit, offset} = makePagination(page, size)
    
    const cbt = await Cbt.findAndCountAll({
        where: condition, 
        limit: limit, 
        offset: offset
    })

    const result = paginationResults({...cbt, page, limit})

    res.status(200)
    res.json(result)
    return
})



module.exports = {
    createCbt,
    updateCbt,
    getCbts,
    getCbtById,
    deleteCbt
}