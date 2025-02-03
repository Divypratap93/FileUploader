const express = require('express')
const app = express()
const sessionMiddleware = require('./middlewares/session');
const path = require("node:path")
const indexRouter = require("./routes/indexRouter")
const dashboardRouter = require("./routes/dashboardRouter")
const folderRouter = require("./routes/folderRouter")
const fileRouter = require("./routes/fileRouter")

app.set("views",path.join(__dirname,"views"))
app.set("view engine", "ejs")

app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use("/",indexRouter)
app.use("/dashboard",dashboardRouter)

app.use("/create-folder",folderRouter)
app.use('/upload',fileRouter)



app.listen(3000,()=>{
    console.log("server running")
})