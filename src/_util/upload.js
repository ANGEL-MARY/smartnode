const multer = require('multer')

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './src/media')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}_${file.originalname}`)
    },
})

const upload = multer({ storage: Storage }).array('image') // Field name and max count

exports.upload = upload
