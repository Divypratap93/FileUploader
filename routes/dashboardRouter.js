const Router = require('express')
const dashboardRouter = Router()
const authenticateSession = require('../middlewares/auth'); // Import the middleware
const prisma = require('../config/db');
const {fetchUserFolders} = require('../controllers/folderController')
const {folderFiles} = require ('../controllers/fileController')


dashboardRouter.get("/folders", authenticateSession, async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.redirect("/login"); // Redirect to login if no session
        }

        const user = await prisma.user.findFirst({
            where: { id: req.session.userId }
        });

        if (!user) {
            return res.redirect("/login"); // Handle case where user is not found
        }

        const userFolders = await fetchUserFolders(req.session.userId);
        console.log(userFolders); 
        
        

        res.render("dashboard", {
            isLoggedIn: true,
            userName: user.name.toUpperCase(),
            title: "Dashboard",
            folderHierarchy: userFolders,
            selectedFolder: false
             
        });
    } catch (error) {
        console.error("Error loading dashboard:", error);
        res.status(500).send("Internal Server Error");
    }
});


dashboardRouter.get("/folders/:folderName", authenticateSession, async (req, res) => {
    const folderName = req.params.folderName;

    const user = await prisma.user.findFirst({
        where: { id: req.session.userId }
    });

    const userFolders = await fetchUserFolders(req.session.userId);
    
    const selectedFolder = userFolders.find(folder => folder.name === folderName);
    const files = selectedFolder ? await folderFiles(req.session.userId, folderName) : [];
    console.log(files)
    console.log(selectedFolder)

    res.render('dashboard', {
        isLoggedIn: true,
        userName: user.name.toUpperCase(),
        title: "Dashboard",
        folderHierarchy: userFolders,
        files: files,
        selectedFolder: selectedFolder
    });
});







module.exports = dashboardRouter
