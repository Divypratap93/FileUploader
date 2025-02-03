
const {createUser} = require("../models/userModel")
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');


const signup = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
         
        const user = await createUser(name,email,hashedPassword)
        req.session.userId = user.id
        console.log(req.session)
        res.redirect('/dashboard/folders')
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const login = async(req,res,next)=>{
    
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);

            // Store user ID in session
            req.session.userId = user.id;

            return res.redirect('/dashboard/folders')
        });
    })(req, res, next);
}

const logout = (req, res) => {
    req.logout(() => {
        req.session.destroy();
        res.json({ message: "Logged out successfully" });
    });
};




module.exports = {signup, login, logout}