const asyncHandler = require('express-async-handler');

const isAdmin = asyncHandler(async(req, res, next) =>{
    const user = req.user 
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.role === 'admin'){
        next()
    }

    res.status(403)
    throw new Error('Only admin can access!')
})

const isModerator = asyncHandler(async(req, res, next) =>{
    const user = req.user 
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.role === 'admin' || user.role === 'panitia'){
        next()
    }

    res.status(403)
    throw new Error('Only moderator can access!')
})

const isMember = asyncHandler(async(req, res, next) =>{
    const user = req.user 
    if(!user){
        return res.status(400).json({message: "User not found"})
    }
    if(user.role === 'member'){
        next()
    }

    res.status(403)
    throw new Error('Only member can access!')
})

module.exports = {
    isAdmin, 
    isModerator, 
    isMember
}