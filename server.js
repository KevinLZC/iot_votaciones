const express = require("express")
require("dotenv").config()
const votacionRoute = require("./src/routes/votacionRoute")

const app = express()

app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views/")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static(__dirname + "/public"))
app.use(votacionRoute)

let PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})  