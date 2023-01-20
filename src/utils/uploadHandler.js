require('dotenv').config()

const path = require('path')
const fs = require('fs')
const BASE_URL = process.env.BASE_URL




/**
 * 
 * @param {string} pathFrom 
 * @param {string} pathTo 
 * @param {saveFile~requestCallback} cb 
 */
const saveFile = async (pathFrom, pathTo, cb) => {
    try {
        let destination
        if (!fs.existsSync(pathTo)) {
            destination = path.dirname(pathTo)
            fs.mkdirSync(destination, { recursive: true })
        }

        fs.renameSync(pathFrom, pathTo)

        cb(err = false, destination = destination)
    } catch (error) {
        cb(err = error, destination = null)
    }
}
/**
 * This callback is displayed as a global member.
 * @callback saveFile~requestCallback
 * @param {Boolean|Error} err - errors
 * @param {string} destination
 */

/**
 * 
 * @param {Object} payload 
 * @param {Object} payload.file
 * @param {string} payload.destination
 * @param {string} payload.filename
 */
const uploadHandler = async(payload) =>{
    const {destination, file} = payload
    let {filename} = payload

    const name = file.originalname
    const ext = name.substr(name.lastIndexOf('.') + 1).toLowerCase()

    filename = filename ? `${filename}.${ext}` : file.filename

 

    const fileURL = `public/uploads/${destination}/`
    const pathFrom = file.path
    const pathTo = path.join(__dirname, '..', '..', `${fileURL}${filename}`)

    await saveFile(pathFrom, pathTo, (err, destination) => {
        if (err) {
            throw err
        }
    })

    return {
        filename: filename,
        uploadFrom: pathFrom,
        destination: pathTo,
        url: encodeURI(BASE_URL + fileURL + filename) 
    }
}


module.exports = uploadHandler