const prisma = require("../config/db");

const createFolder = async(userId,folderName)=>{
    
   return await prisma.folder.create({
    data: {
        name: folderName,
        userId: userId
    }
})}


const userFolders = async(userId)=>{
    return await prisma.folder.findMany({where:{
        userId: userId
    }})
}

const findFolder = async(userId,foldername)=>{
    return await prisma.folder.findFirst(
        {
            where:{
                userId: userId,
                name: foldername
            }
        }
    )
}



module.exports = {createFolder,userFolders,findFolder}