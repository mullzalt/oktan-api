const asyncHandler = require('express-async-handler');
const { Cbt } = require('../../db');
const fileUploadHandler = require('../../utils/fileHandler');

const uploadCbtCover = asyncHandler(async (req, res) => {
    const { cbtId } = req.params
    const file = req.file

    const cbt = await Cbt.findOne({
        where: {
            id: cbtId
        }
    })

    if (!cbt) {
        res.status(404)
        throw new Error("CBT not found")
    }

    const upload = await fileUploadHandler({
        files: file,
        nameFormats: 'IMG_COVER',
        folders: `cbt/${cbt.id}`
    })

    await cbt.update({
        imgUrl: upload.url
    })

    res.status(200)
    res.json({
        message: 'Cover updated!',
        ...upload,
        cbt
    })
    return

})

module.exports = { uploadCbtCover }