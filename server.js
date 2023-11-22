const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const votacionRoute = require("./src/routes/votacionRoute")

const app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views/")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static(__dirname + "/public"))
app.use(votacionRoute)

mongoose
  .connect(process.env.MONGODB_URI) // conectamos con la base de datos
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error));

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})  