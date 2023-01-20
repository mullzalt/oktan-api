const asyncHandler = require('express-async-handler');
const { Cbt, CbtQuestion, CbtOption, Profile } = require('../db');

const checkAnswer = asyncHandler(async(req, res) =>{
    const {questionId, optionId, isEmpty} = req.body
    const {cbtId} = req.params

    let points = 0

    const cbt = await Cbt.findByPk(cbtId)
    if(!cbt){
        res.status(404)
        throw new Error('cbt not found')
    }

    const question = await CbtQuestion.findOne({
        where: {id: questionId}
    })

    if(!question){
        res.status(404)
        throw new Error('question not found')
    }

    const {onCorrectPoint, onNullPoint, onWrongPoint} = cbt
let option
    if(optionId){
        option = await CbtOption.findOne({
            where: {id: optionId}
        })

        if(option.isAnswer){
            points = points + onCorrectPoint
        }
        if(!option.isAnswer){
            points = points + onWrongPoint
        }
    }
    
    if(!optionId){
        points = points + onNullPoint
    }


    return res.json({points})

})


const validatePayment = asyncHandler(async(req, res, next) =>{
    const {userId, cbtId} = req.params

    const profile = await Profile.findOne({
        where: {userId: userId}
    })

    if(!profile){
        res.status(404)
        throw new Error('User not found')
    }

    
})

module.exports = {
    checkAnswer
}