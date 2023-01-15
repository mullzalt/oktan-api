const asyncHandler = require('express-async-handler');
const db = require('../db');

/**
 * Checking if model exist 
 * @author  Rizki Dimulya <rizki.d.mulya@gmail.com>
 * @param {string} model - Name of model searched  
 */

const checkModel = (model) => {
    const modelList = Object.keys(db)

    if (!modelList.includes(model)) {
        throw new Error(`Table ${model} not found in your database!`)
    }
}

const modelFindOne = async (options) => {
    const { table, indicator, required = false, param } = options
    checkModel(table)

    if (![indicator] in param) {
        throw new Error(`Indicator ${indicator} does not match any given params!`)
    }

    const result = await db[table].findOne({
        where: { id: param[indicator] }
    })

    if (required && !result) {
        throw new Error(`${table} not found!`)
    }

    return { [table]: result }
}

const modelFindAll = async (options) => {
    const { table, indicator, required = false, param } = options
    checkModel(table)

    if (![indicator] in param) {
        throw new Error(`Indicator ${indicator} does not match any given params!`)
    }

    const result = await db[table].findOne({
        where: { id: param[indicator] }
    })

    if (required && !result) {
        throw new Error(`${table} not found!`)
    }

    return { [table]: result }
}



/**
 * Create Function Controller
 * @author Rizki Dimulya <rizki.d.mulya@gmail.com>
 * @param {Object} options - Request Options
 * @param {string[]} options.params - Name of params that defined in router 
 * @param {string} options.model - Name 
 * @param {Object} options.requiredTable - Name
 * @param {}
 */
const createController = (options) => {
    return asyncHandler(async (req, res) => {
        checkModel(options.model)

        let param = {}
        let datas = {}

        options.params.map(par => {
            Object.assign(param, { [par]: req.params[par] })
        })

        if (options.requiredTable) {
            const data = await Promise.all(
                options.requiredTable.map(async (options) => {
                    const data = await modelFindOne({ ...options, param })

                    return data
                })
            )

            Object.assign(datas, ...data)
        }

        res.status(200)
        res.json(datas)
        return
    })
}

module.exports = {
    createController
}