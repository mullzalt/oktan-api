const { check, validationResult } = require("express-validator")
const { Competition } = require("../db")



const errResult = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: 'Invalid values',
            errors: errors.mapped()
        })
    }
    next()
}

exports.validateLogin = [
    check('identifier')
        .not().isEmpty()
        .withMessage("username or email cannot be empty"),

    check('password')
        .not().isEmpty()
        .withMessage("Please fill your password"),

    errResult
]


exports.validateCbt = [
    check('title')
        .notEmpty().withMessage('Please enter a title!'),

    check('startDate')
        .notEmpty().withMessage('Please enter start date!')
        .isDate().withMessage('Please enter a date!'),

    check('endDate')
        .notEmpty().withMessage('Please enter end date!')
        .isDate().withMessage('Please enter a date!'),

    check('duration')
        .notEmpty().withMessage('Please enter duration!')
        .isNumeric().withMessage('Please enter time in minutes'),

    check('type')
        .optional({ nullable: true })
        .isIn(['TRYOUT', 'ACTUAL_TEST']),

    errResult
]