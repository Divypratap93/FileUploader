const { PrismaClient } = require('@prisma/client');
const cloudinary = require('../config/cloudinary');
const prisma = new PrismaClient();
const {findFolder} = require("../models/folderModel")

const saveFileInfo = async (userId, file,foldername) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "uploads", // Cloudinary folder
        });
        const folder = await findFolder(userId,foldername)
        // Save file details in Prisma
        const savedFile = await prisma.file.create({
            data: {
                userId,
                url: result.secure_url,
                publicId: result.public_id,
                filename: file.originalname,
                folderId: folder.id,
                size: result.bytes
            }
        });

        return savedFile;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
    }
};

const fetchFiles = async (userId, foldername) => {
    // Fetch the folder for the user and foldername
    const folder = await prisma.folder.findFirst({
        where: {
            userId: userId,
            name: foldername
        }
    });

    // If folder is not found, return an empty array or handle error
    if (!folder) {
        return []; // or throw an error if you prefer to handle it differently
    }

    // Fetch files for the found folder
    const files = await prisma.file.findMany({
        where: {
            folderId: folder.id // Use the folder's id to query files
        }
    });

    return files;
};

const deleteFile = async(publicId)=>{
    
        

        if (!publicId) {
            return res.status(400).json({ message: "Public ID is required" });
        }
        const findFile = await prisma.file.findFirst({
            where:{
                publicId: publicId
            }
        })
        // Delete file from Cloudinary
       const deleteRes =  await cloudinary.uploader.destroy(findFile.id);

      await prisma.file.delete({
        where:{
            id: findFile.id
        }
       })

      return deleteRes
}




module.exports = { saveFileInfo, fetchFiles, deleteFile };
