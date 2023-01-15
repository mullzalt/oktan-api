const makePagination = (Page, Size) => {
    const size = (parseInt(Size) < 1) ? 10 : (isNaN(Size)) ? 10 : parseInt(Size)
    const page = (parseInt(Page) < 1) ? 1 : (isNaN(Page)) ? 1 : parseInt(Page)

    const offset = (page - 1) * size
    const limit = size
    const currentPage = page

    const result = { offset, limit, currentPage }
    return result
}

const paginationResults = payload => {

    const { count, limit, rows, page } = payload

    const totalPages = Math.ceil(count / limit)

    const result = {
        size: limit,
        totalItem: count,
        totalPages,
        rows,
        currentPage: page
    }
    return result
}

/**
 * @typedef {Object} initResult
 * @property {number} offset
 * @property {number} limit
 * @property {number} currentPage
 */

/**
 * Initiate pagination
 * @param {number} Page - Current page
 * @param {number} Size - Data size
 * @returns {{limit:Number, offset:Number, currentPage:Number}} result 
 */
const initPaginate = (Page, Size) => {
    const size = (parseInt(Size) < 1) ? 10 : (isNaN(Size)) ? 10 : parseInt(Size)
    const page = (parseInt(Page) < 1) ? 1 : (isNaN(Page)) ? 1 : parseInt(Page)

    const offset = (page - 1) * size
    const limit = size
    const currentPage = page
    return { offset, limit, currentPage }
}


/**
 * 
 * @param {Object} payload 
 * @param {number} payload.count
 * @param {number} payload.limit
 * @param {number} payload.page
 * @param {Object} payload.rows
 */
const paginateResult = (payload) => {
    const { count, limit, rows, page } = payload
    const totalPages = Math.ceil(count / limit)
    return {
        size: limit,
        totalItems: count,
        currentPage: page,
        totalPages,
        rows,
    }
}


module.exports = {
    makePagination,
    paginationResults,
    initPaginate,
    paginateResult
}