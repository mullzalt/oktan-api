const { check, validationResult } = require("express-validator")
const { Competition, User } = require("../db")




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

exports.validateRegister = [
    check('username')
        .not().isEmpty()
        .withMessage('User name can not be empty!')
        .isLength({ min: 6, max: 18 })
        .withMessage('Username must be 6-18 characters long!')
        .custom(value => !/\s/.test(value))
        .withMessage('Space not allowed in username!'),

    check(['name', 'institute'])
        .not().isEmpty()
        .withMessage('Please fill this field!'),

    check('phone')
        .not().isEmpty()
        .withMessage('Must add phone number!')
        .isMobilePhone()
        .isLength({ min: 10 })
        .withMessage('Must be an valid phone number!'),

    check('email')
        .isEmail()
        .withMessage('Please enter a valid email'),

    check('password')
        .not().isEmpty()
        .withMessage('Password can not be empty!')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long!'),

    check('username').custom(async value => {
        let user = await User.findOne({
            where: { username: value }
        })
        if (user !== null) {
            return Promise.reject("Username already taken!")
        }
    }),

    check('email').custom(async value => {
        let user = await User.findOne({
            where: { email: value }
        })
        if (user !== null) {
            return Promise.reject("Email already used!")
        }
    }),

    errResult
]