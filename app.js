const express = require("express")
const session = require("express-session")
const cookies = require("cookie-parser")

const path = require("path")

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware")



const app = express()

app.use(session({
   secret: "un secreto",
   resave: false,
   saveUninitialized: false,
}))

app.use(cookies());


app.use(userLoggedMiddleware)

const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");

app.use(express.urlencoded({extended : false}))

app.use(express.static('public'))

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", mainRoutes);
app.use("/user", userRoutes);
 
app.listen(3000, () => {
   console.log('Servidor iniciado en http://localhost:3000')  
});