const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const { saveFileInfo,fetchFiles,deleteFile } = require('../models/fileModel');


const fileUpload = async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const folderName = req.params.foldername;
        const fileData = await saveFileInfo(req.session.userId, req.file,folderName);

        res.redirect(`/dashboard/folders/${folderName}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const reqDeleteFile = async(req,res)=>{
    
        const { publicId } = req.body; // Get public ID from request
        
       await deleteFile(publicId)
       res.json({ success: true, message: "File deleted successfully from Cloudinary" });
    
    
}


const folderFiles = async (userId, foldername) => {
    try {
        // Fetch file data from the database (or file system)
        const fileData = await fetchFiles(userId, foldername);
        return fileData;  // Return the file data (don't handle response here)
    } catch (error) {
        console.error("Error fetching files:", error);
        throw new Error("Could not fetch files");
    }
};

module.exports = {fileUpload,folderFiles,upload,reqDeleteFile}
