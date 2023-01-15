const asyncHandler = require('express-async-handler');
const models = require('../db');
const fileUploadHandler = require('../utils/fileHandler');


const tableHandler = (payload) => {
    const { label, destination, model, where, include } = payload

    return asyncHandler(async (req, res, next) => {
        const modelList = Object.keys(models)


        if (!modelList.includes(model)) {
            throw new Error('Model not found')
        }

        const data = await models[model].findAndCountAll({
            where,
            include
        })

        req[label] = data
        next()
    })



}



const generalPost = asyncHandler(async (req, res) => {
    const { model } = req.params

    let { destination, filename, imgUrl, ...data } = req.body

    const modelList = Object.keys(models)

    if (!modelList.includes(model)) {
        throw new Error('Model not found')
    }
    const file = req.file

    if (file) {
        const fileData = await fileUploadHandler({
            files: file,
            nameFormats: filename,
            folders: destination
        })
        imgUrl = fileData.url
    }

    const table = await models[model].create({
        ...data,
        imgUrl
    })

    return res.json(table)
})

const generalPut = asyncHandler(async (req, res) => {
    const { model, id } = req.params

    let { destination, filename, imgUrl, ...data } = req.body

    const modelList = Object.keys(models)

    if (!modelList.includes(model)) {
        throw new Error('Model not found')
    }
    const file = req.file

    if (file) {
        const fileData = await fileUploadHandler({
            files: file,
            nameFormats: filename,
            folders: destination
        })
        imgUrl = fileData.url
    }

    const table = await models[model].findOne({
        where: {
            id: id
        }
    })

    if (!table) {
        res.status(404)
        throw new Error(`Could not found requested data in table ${model}`)
    }

    await table.update({
        ...data,
        imgUrl
    })

    return res.json(table)
})

const generalDelete = asyncHandler(async (req, res) => {
    const { model, id } = req.params

    const table = await models[model].findOne({
        where: {
            id: id
        }
    })

    if (!table) {
        res.status(404)
        throw new Error(`Could not found requested data in table ${model}`)
    }

    await table.destroy()

    return res.json({
        message: `Data with id: ${id} from ${model} successfully deleted`
    })
})

const generalGetById = asyncHandler(async (req, res) => {
    const { model, id } = req.params

    const table = await models[model].findOne({
        where: {
            id: id
        }
    })

    if (!table) {
        res.status(404)
        throw new Error(`Could not found requested data in table ${model}`)
    }

    return res.json(table)
})


module.exports = {
    generalPost,
    generalPut,
    generalDelete,
    generalGetById,

    tableHandler
}