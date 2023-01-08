const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const { User, Profile } = require('../../db');
const { makePagination, paginationResults } = require('../../utils/paginate');

const createUser = asyncHandler(async(req, res) =>{

})

const updateUser = asyncHandler(async(req, res) =>{

})

const updatePassword = asyncHandler(async(req, res) =>{

})

const getUsers = asyncHandler(async(req, res) =>{
    const {search, role, verified, size, page} = req.query

    const getWhere = search ? {
        [Op.or] : [
            {username: {[Op.like]: `%${search}%`}},
            {email: {[Op.like]: `%${search}%`}},
            {'$user_profile.name$': {[Op.like]: `%${search}%`}},
            {'$user_profile.institute$': {[Op.like]: `%${search}%`}},
            {'$user_profile.phone$': {[Op.like]: `%${search}%`}},
        ]
    } : null

    const getRole = role ? {roles: role} : null
    const getVerified = verified === 'false' ? {verified : false} : verified === 'true' ? {verified : true} : null

    const condition = {
        [Op.and]: [
            getWhere, 
            getRole,
            getVerified
        ]
    }

    const {limit, offset} = makePagination(page, size)

    const user = await User.findAndCountAll({
        where: condition, 
        limit: limit, 
        offset: offset, 
        include: [{
            model: Profile,
            attributes: {
                exclude: ['id']
            }
        }], 
        attributes: {
            exclude: ['password']
        }
    })

    const result = paginationResults({...user, page, limit})

    res.status(200)
    res.json(result)



    // const {where, role, size, page} = req.query
    
    // var getWhere = where ? { 
    //     [Op.or]: [
    //         {username: {[Op.like]: `%${where}%`}},
    //         {email: {[Op.like]: `%${where}%`}},
    //         {roles: {[Op.like]: `%${where}%`}},
    //     ]
    // } : null;

    // const getRole = role ? {roles: role} : null

    // const condition = {
    //     [Op.and]: [
    //         getWhere, getRole
    //     ]
    // }

    // const paginate = makePagination(page, size)
    
    // await User.findAndCountAll({
    //     where: condition,
    //     limit: paginate.limit, 
    //     offset: paginate.offset,
    //     include: [{
    //         model: Member, 
    //     }],
    //     attributes: {
    //         exclude: ['password']
    //     }
    // })
    // .then((data) => {
    //     const result = paginateResult(data,paginate.currentPage, paginate.limit)

    //     return res.status(200).json({
    //         size: paginate.limit,
    //         currentPage : result.currentPage,
    //         totalPage: result.totalPages,
    //         totalItem: result.totalItem, 
    //         rows: result.rows
    //     })
    // })
    // .catch((err) => {throw err})
})

const getUsersById = asyncHandler(async(req, res) =>{

})

const getUsersByBody = asyncHandler(async(req, res) =>{

})

module.exports = {
    createUser,
    getUsers
}