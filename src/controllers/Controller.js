const models = require("../db");
const asyncHandler = require('express-async-handler');
const { initPaginate, paginateResult } = require("../utils/paginate");
const { Op } = require("sequelize");
const uploadHandler = require("../utils/uploadHandler");
const path = require('path');
const { sequelize } = require("../db/models");

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
     * @param {Object[]} whitelists
     * @param {string} whitelists.model
     * @param {string[]} whitelists.attributes
     * @param {string} [orderBy = '']
     * @param {("DESC" | "ASC")} [sortDir = "ASC"] 
     */
    #sortHelper = (whitelists, orderBy = '', sortDir = "ASC") => {
        let param = orderBy 
        if(!Array.isArray(param)){
            param = new Array(param)
        }
        let order = []

        whitelists.map(whitelist => {
            if(whitelist.attributes.includes(orderBy)){
                if(whitelist.model === this.#table){
                    order.push([orderBy, sortDir])
                }else{
                    order.push([models[whitelist.model], orderBy, sortDir])
                }
            }
        })

        return order
    }


    /**
     * Create new post router
     * @param {Object} options 
     * @param {Object} [options.upload]
     * @param {string} options.upload.attribute
     * @param {string} options.upload.destination
     * @param {boolean} [options.upload.includeId = false]
     * @param {string} [options.upload.paramId]
     * @param {Object} [options.parent]
     * @param {string} options.parent.attribute
     * @param {string} options.parent.param
     * @param {string[]} [options.allowedBody]
     * @returns 
     */
    post(options) {
        
        
        return asyncHandler(async (req, res) => {
            const {id, filename, ...data } = req.body

            const file = req.file

            let parent = {}

            if(options?.parent){
                Object.assign(parent, {[options.parent.attribute]: req.params[options.parent.param]})
            }

            let postData = data

            if(options?.allowedBody){
                postData = {}

                options.allowedBody.map(body => {
                    Object.assign(postData, {[body]: req.body[body]})
                })
            }

            const result = await models[this.#table].create({...postData, ...parent})

            
            if (file && options?.upload) {
                const {destination = '', attribute = '', includeId = false, paramId = ''} = options?.upload
                let newDestination

                newDestination = destination
    
                const tableId = result.id
    
                if(includeId){
                    newDestination = `${destination}/${tableId}`
                }

                if(paramId){
                    newDestination = `${destination}/${req.params[paramId]}`
                }

                const fileData = await uploadHandler({
                    file, 
                    destination: newDestination,
                    filename
                })
                const url = fileData.url
                await result.update({
                    [attribute]: url
                })
            }

            res.status(201)
            res.json(result)
        })
    }



    /**
     * Create new upsert/post/put router
     * @param {Object} options 
     * @param {Object} [options.upload]
     * @param {string} options.upload.attribute
     * @param {string} options.upload.destination
     * @param {boolean} [options.upload.includeId = false]
     * @param {string} options.param
     * @param {string} options.attribute
     * @param {string[]} [options.allowedBody]
     * @param {Object[]} [options.parents]
     * @param {string} options.parents.attribute
     * @param {string} options.parents.param
     * @returns 
     */
    upsert(options) {
        return asyncHandler(async (req, res) => {
            const {id, filename, ...data} = req.body

            const a = await models.CbtMemberAnswer.findAll()

            return res.json(a)

            let where = {[options.attribute]: req.params[options.param]}

            const file = req.file

            let updateData = data

            let parents = {}

            if(options.parents){

                options.parents.map(parent => {
                    Object.assign(parents, {[parent.attribute]: req.params[parent.param]})
                })

            }

            if(options?.allowedBody){
                updateData = {}

                options.allowedBody.map(body => {
                    Object.assign(updateData, {[body]: req.body[body]})
                })
            }

            let result

            result = await models[this.#table].findOne({
                where: where
            })

            if (!result) {
                result = await models[this.#table].create({
                    ...updateData
                })
            }

            if(result){
                await result.update({...updateData})
            }

            
            if (file && options?.upload) {
                const {destination, attribute, includeId = false} = options?.upload
                let newDestination

                newDestination = destination
    
                const resultId = result.id
    
                if(includeId){
                    newDestination = `${destination}/${resultId}`
                }


                const fileData = await uploadHandler({
                    file, 
                    destination: newDestination,
                    filename
                })
                const url = fileData.url
                await result.update({
                    [attribute]: url
                })
            }


            res.json({ 'message': `${this.#table} updated` ,...result })
        })

        
    }



    /**
     * @param {Object} options
     * @param {Object[]} options.where
     * @param {string} options.where.param - param that indicate attributs value
     * @param {string} options.where.attribue - attribute to be found
     * @param {string} [options.where.isRequired = false] - must be included in search
     * @param {Object[]} [options.include]
     * @param {string} options.include.model 
     * @param {string} [options.include.as]
     * @returns 
     */
    getByParam(options) {
        return asyncHandler(async (req, res) => {
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

            let getOr = []
            let getAnd = []

            options.where.map(option => {
                const isRequired = option.isRequired ? option.isRequired : false

                if(isRequired){
                    getAnd.push({[option.attribue]: req.params[option.param]})
                }else{
                    getOr.push({[option.attribue]: req.params[option.param]})
                }
                
            })

            const orCondition = getOr === [] ? null : {
                [Op.or]: getOr
            }

            const condition = {
                [Op.and]: [
                    orCondition,
                    getAnd
                ]
            }

            const data = await models[this.#table].findOne({
                where: condition,
                include: includeOptions
            })

            if (!data) {
                const err = new Error(`${this.#table} not found!`)
                err.status = 404
                throw err
            }

            res.json(data)
            return
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
     * @param {Object[]} [options.parentParam] Search by this parameter in query as individuals param
     * @param {Object[]} options.parentParam.attribute Search by this parameter in query as individuals param
     * @param {Object[]} options.parentParam.param Search by this parameter in query as individuals param
     * @param {Object[]} [options.orders] Validate order by whitelisting
     * @param {string} options.orders.model Validate order by whitelisting
     * @param {string[]} options.orders.attributes Attributes that can be sorted
     * @param {boolean} options.randomSort Attributes that can be sorted
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
            const { page, size, search = '' } = req.query

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

            if (options?.parentParam) {
                options.parentParam.map(param => {
                    getAnd.push({ [param.attribute]: { [Op.eq]: req.params[param.param] } })
                })
            }

            const orCondition = getOr === [] ? null : {
                [Op.or]: getOr
            }

            const condition = {
                [Op.and]: [
                    orCondition,
                    getAnd
                ]
            }

            let orderOptions 

            if (req.query?.orderBy && options?.orders) {
                const {orderBy, sortDir} = req.query
                orderOptions = this.#sortHelper(options.orders, orderBy, sortDir)
            }

            if(options?.randomSort){
                orderOptions = sequelize.random()
            }

            const { offset, limit, currentPage } = initPaginate(page, size)

            const count = await models[this.#table].count({
                where: condition,
                include: includeOptions,
                offset,
                limit,
                order: orderOptions
            })

            const data = await models[this.#table].findAndCountAll({
                where: condition,
                include: includeOptions,
                offset,
                limit,
                distinct: true,
                order: orderOptions
            })


            const result = paginateResult({ limit, page: currentPage, ...data, })

            return res.json({...result, count})

        })
    }


        /**
     * Create new put router
     * @param {Object} options 
     * @param {Object} [options.upload]
     * @param {string} options.upload.attribute
     * @param {string} options.upload.destination
     * @param {boolean} [options.upload.includeId = false]
     * @param {string} options.param
     * @param {string[]} [options.allowedBody]
     * @returns 
     */
    put(options) {
        

        return asyncHandler(async (req, res) => {
            const {id, filename, ...data} = req.body

            let where = {id: req.params[options.param]}


            const file = req.file

            const result = await models[this.#table].findOne({
                where: where
            })

            if (!result) {
                const err = new Error(`${this.#table} not found!`)
                err.status = 404
                throw err
            }

            
            if (file && options?.upload) {
                const {destination, attribute, includeId = false} = options?.upload
                let newDestination

                newDestination = destination
    
                const resultId = result.id
    
                if(includeId){
                    newDestination = `${destination}/${resultId}`
                }


                const fileData = await uploadHandler({
                    file, 
                    destination: newDestination,
                    filename
                })
                const url = fileData.url
                await result.update({
                    [attribute]: url
                })
            }

            let updateData = data

            if(options?.allowedBody){
                updateData = {}

                options.allowedBody.map(body => {
                    Object.assign(updateData, {[body]: req.body[body]})
                })
            }


            await result.update({...updateData})

            res.json({ 'message': `${this.#table} updated` ,...result })
        })

        
    }


            /**
     * New delete router
     * @param {Object} options 
     * @param {string} options.param
     * @param {string} [options.attribute]
     * @returns 
     */
    delete(options) {
        return asyncHandler(async (req, res) => {

            let where = {id: req.params[options.param]}

            const result = await models[this.#table].findOne({
                where: where
            })

            if (!result) {
                const err = new Error(`${this.#table} not found!`)
                err.status = 404
                throw err
            }

            const name = result[options?.attribute] ?  result[options.attribute] : null

            await result.destroy()

            res.json({ 'message': `${this.#table} with attribute "${name}" deleted`})
        })
    }

}

module.exports = { CrudController }
