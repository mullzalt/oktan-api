const asyncHandler = require('express-async-handler');
const { User, Profile } = require('../../db');

const getMe = asyncHandler(async (req, res) => {
    const { id } = req.user

    const user = await User.findOne({
        where: { id: id },
        attributes: {
            exclude: 'password'
        },
    })

    const profile = await Profile.findOne({
        where: {
            userId: user.id
        }
    })

    res.status(200)
    res.json({
        user, profile
    })
    return

})

module.exports = { getMe }