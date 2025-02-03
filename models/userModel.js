const prisma = require("../config/db")


const createUser = async(name,email,password)=>{
    return await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    })
}







module.exports = {createUser}