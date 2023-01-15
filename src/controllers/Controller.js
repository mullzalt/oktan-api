const models = require("../db");
const asyncHandler = require('express-async-handler');
const { initPaginate, paginateResult } = require("../utils/paginate");
const { Op } = require("sequelize");

/** Controller class for calling Crud API */
class CrudController {
    #table

    /**
     * Create a new controller 
     * @param {string} table
     */
    constructor(table) {
        this.#checkTable(table)
        this.#table = table
    }

    /**
     * Check for existing table
     * @param {string} table 
     */
    #checkTable = (table) => {
        const list = Object.keys(models)
        if (!list.includes(table)) {
            throw new Error(`Could not find table '${table}' in Database`)
        }
    }

    /**
     * 
     * @param {Object} options
     * @param {string} options.model
     * @param {string[]} options.whitelist 
     */
    #sortHelper = (options) => {

    }

    post() {
        return asyncHandler(async (req, res) => {
            res.json({ 'table': this.#table })
        })
    }

    getByParam() {
        return asyncHandler(async (req, res) => {
            res.json({ 'table': this.#table })
        })


    }


    /**
     * Get all 
     * @param {Object} options
     * @param {Object[]} [options.include]
     * @param {string} options.include.model 
     * @param {string} [options.include.as]
     * @param {string[]} [options.searchParam] Search by this search query as one
     * @param {Object[]} [options.otherParam] Search by this parameter in query as individuals param
     * @param {Object[]} options.otherParam.attribute Search by this parameter in query as individuals param
     * @param {Object[]} options.otherParam.query Search by this parameter in query as individuals param
     * @param {Object[]} [options.otherParam.isBool = false] Search by this parameter in query as individuals param
     * @returns 
     */
    getAll(options) {
        let includeOptions = []

        if (options?.include) {
            options.include.map(inc => {
                const { as, model, ...other } = inc
                const alias = inc?.as ? { as: inc.as } : {}
                includeOptions.push({
                    model: models[inc.model],
                    ...alias,
                    ...other
                })
            })
        }

        return asyncHandler(async (req, res) => {
            const { page, size, search } = req.query

            let getOr = []
            let getAnd = []

            if (options?.searchParam) {
                options.searchParam.map(attribute => {
                    getOr.push({ [attribute]: { [Op.like]: `%${search}%` } })
                })
            }

            if (options?.otherParam) {
                options.otherParam.map(param => {
                    const isBool = param?.isBool ? param.isBool : false
                    let value = req.query[param.query]

                    if (!value) {
                        return
                    }

                    if (isBool) {
                        value = value === 'true' ? true : value === 'false' ? false : true
                    }

                    getAnd.push({ [param.attribute]: { [Op.eq]: value } })
                })
            }

            const orCondition = {
                [Op.or]: getOr
            }

            const condition = {
                [Op.and]: [
                    orCondition,
                    getAnd
                ]
            }



            if (req.query?.orderBy) {

            }

            const { offset, limit, currentPage } = initPaginate(page, size)

            const data = await models['User'].findAndCountAll({
                where: condition,
                include: includeOptions,
                offset,
                limit,
                order: [
                    ['username', 'DESC']
                ]
            })

            const result = paginateResult({ ...data, limit, page: currentPage })

            return res.json(result)

        })
    }

    put() {
        return asyncHandler(async (req, res) => {
            res.json({ 'table': this.#table })
        })
    }

    delete() {
        return asyncHandler(async (req, res) => {
            res.json({ 'table': this.#table })
        })
    }

}

module.exports = { CrudController }
