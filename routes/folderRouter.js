const Router = require('express')
const authenticateSession = require('../middlewares/auth')
const {createuserFolder} = require('../controllers/folderController')

const folderRouter = Router()


folderRouter.post('/', authenticateSession, async (req, res) => {
    const { folderName } = req.body;
  
    // Create the folder (add to your database)
    await createuserFolder(req.session.userId, folderName); // Assuming this function saves the folder
  
    res.redirect(`/dashboard/folders/${folderName}`); // Redirect back to the dashboard after folder creation
  });





  module.exports = folderRouter