const multer = require("multer");
const path = require('path')
const crypto = require('crypto')
const fs = require('fs')
const asyncHandler = require('express-async-handler');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'public/uploads/tmp'),
    filename: (req, file, cb) => {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
}).single('file')

const uploadFile = asyncHandler(async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(422).json({
                message: `Could not upload, ${err.message}`
            })
        }
        if (!req.file) {
            res.status(422)
            return res.json({
                message: 'Please Upload a file!'
            })
        }
        next()
    })
})

const fileUploader = asyncHandler(async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(422).json({
                message: `Could not upload, ${err.message}`
            })
        }
        next()
    })
})

module.exports = {
    uploadFile,
    fileUploader
}