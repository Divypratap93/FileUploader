const Router = require('express')
const indexRouter = Router()
const {signup, login} = require("../controllers/authController")
const passport = require('../config/passport');
const authenticateSession = require('../middlewares/auth'); 



indexRouter.get("/",(req,res,next)=>{
    
    res.redirect("/login")
})

indexRouter.get("/login",authenticateSession,(req,res)=>{
    const isLoggedIn = req.session.userId ? true : false;
    res.render("login", {title: 'Login', isLoggedIn})
})

indexRouter.get("/signup",authenticateSession,(req,res)=>{
    const isLoggedIn = req.session.userId ? true : false;
    res.render("signup", {title: 'Signup',isLoggedIn})
})

indexRouter.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})



indexRouter.post("/signup",signup)
indexRouter.post("/login",login)

module.exports = indexRouter