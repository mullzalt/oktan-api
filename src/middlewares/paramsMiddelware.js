const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const db = require('../db');

/**
 * @param {string} model - Requested model
 * @param {Object} db - DB modules
 */
const checkModel = (model) => {
    const list = Object.keys(db)

    if (!list.includes(model)) {
        throw new Error(`Could not find model '${model}' in Database`)
    }
}


/**
 * Middleware for finding certain row in table by param
 * @author Rizki Dimulya <rizki.d.mulya@gmail.com>
 * @param {Object[]} options - Payload Options
 * @param {string} options.table - table name as in db
 * @param {Object[]} options.where - Where clause 
 * @param {string} options.where.attribute - table attribute to be find
 * @param {string} options.where.param - table attributes value equivalent to params
 */
const findByParam = (options) => {
    let op = options

    if (!Array.isArray(options)) {
        op = new Array(options)
    }

    return asyncHandler(async (req, res, next) => {
        await Promise.all(
            op.map(async tab => {
                checkModel(tab.table)
                let getWhere = []
                let tabWhere = tab.where

                if (!Array.isArray(tabWhere)) {
                    tabWhere = new Array(tabWhere)
                }

                tabWhere.map(w => {
                    getWhere.push({ [w.attribute]: req.params[w.param] })
                })

                const where = { [Op.and]: getWhere }


                const result = await db[tab.table].findOne({
                    where: where
                })

                if (!result) {
                    const err = new Error(`${tab.table} not found!`)
                    err.status = 404
                    throw err
                }
            })
        )

        next()
    })
}






module.exports = {
    findByParam
}