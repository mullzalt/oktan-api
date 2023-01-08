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
        currentPage : page
    }
    return result
}

module.exports = {
    makePagination,
    paginationResults,
}