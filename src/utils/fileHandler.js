require('dotenv').config()

const path = require('path')
const fs = require('fs')
const BASE_URL = process.env.BASE_URL

const isFormatValid = async (formats, filename) => {
    const formatAllowed = formats

    const ext = filename.substr(filename.lastIndexOf('.') + 1)
        .toLowerCase()

    if (formatAllowed.indexOf(ext) > -1) return ext

    return false
}

const saveFile = async (pathFrom, pathTo, callback) => {
    try {
        let destination
        if (!fs.existsSync(pathTo)) {
            destination = path.dirname(pathTo)
            fs.mkdirSync(destination, { recursive: true })
        }

        fs.renameSync(pathFrom, pathTo)

        callback(err = false, data = destination)
    } catch (error) {
        callback(err = error, data = null)
        throw err
    }
}

const fileUploadHandler = async ({ files, nameFormats, folders }) => {
    const file = files
    const nameFormat = nameFormats ? nameFormats : file?.originalname
    const folder = folders


    if (!file) {
        throw new Error("File not detected")
    }

    if (!folder) {
        fs.unlinkSync(file.path)
        throw new Error("Please enter folder destination")
    }

    const name = file.originalname
    const ext = name.substr(name.lastIndexOf('.') + 1).toLowerCase()


    const fileName = `${nameFormat}.${ext}`
    const fileURL = `public/uploads/${folder}/`
    const pathFrom = file?.path
    const pathTo = path.join(__dirname, '..', '..', `${fileURL}${fileName}`)

    await saveFile(pathFrom, pathTo, (err, destination) => {
        if (err) {
            throw err
        }
    })

    return {
        filename: fileName,
        uploadFrom: pathFrom,
        destination: pathTo,
        url: BASE_URL + fileURL + fileName
    }


}

module.exports = fileUploadHandler

