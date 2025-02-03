const {createFolder,userFolders} = require("../models/folderModel")

const createuserFolder = async(userId, folderName)=>{
    
    return await createFolder(userId,folderName)
}


const fetchUserFolders = async(userId)=>{
    
    return await userFolders(userId)
}


module.exports = {createuserFolder, fetchUserFolders}