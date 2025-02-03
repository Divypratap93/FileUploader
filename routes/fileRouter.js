const Router = require('express')
const {fileUpload,upload,reqDeleteFile} = require('../controllers/fileController')
const authenticateSession = require('../middlewares/auth')
const fileRouter = Router()

fileRouter.post("/delete-file",authenticateSession,reqDeleteFile)
fileRouter.post("/:foldername?",authenticateSession,upload.single('file'),fileUpload)


module.exports = fileRouter