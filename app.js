const express = require("express")
const path = require("path")

const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/user");

const app = express()

app.use(express.urlencoded({extended : false}))

app.use(express.static('public'))

app.set("view engine","ejs");
app.set("views", path.join(__dirname, "./views"));

app.use("/", mainRoutes);
app.use("/user", userRoutes);
 
app.listen(3000, () => {
   console.log('Servidor iniciado en http://localhost:3000')  
});