const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const WebSocket = require("ws")
const htpp = require("http")
const mqtt = require("mqtt")
const votacionRoute = require("./src/routes/votacionRoute")

const app = express()
require("dotenv").config()

app.set("view engine", "ejs")
app.set("views", __dirname + "/src/views/")

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use("/assets", express.static(__dirname + "/public"))
app.use(votacionRoute)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error(error));


const Server = htpp.createServer(app)
const wss = new WebSocket.Server({ server: Server })

const clientId = 'wss_' + Math.random().toString(16).substr(2, 8)
const host = `wss://${process.env.EMQX_HOST}:${process.env.EMQX_PORT}/mqtt`
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.EMQX_USERNAME,
  password: process.env.EMQX_PASSWORD,
  reconnectPeriod: 1000,
}
const client = mqtt.connect(host, options)
client.subscribe("/iot/votaciones/test", (error) => {
  if (error) {
    console.log('subscribe error:', error)
    return
  }
  console.log(`Subscribe to topic /iot/votaciones/test`)
})

wss.on("connection", (ws) => {
  ws.on('error', console.error)
  client.on('message', (topic, message) => {
    message = message.toString();
    console.log(message)
    const dataToSend = message
    ws.send(dataToSend);
  });
});

const PORT = process.env.PORT || 3000

Server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})  

/*
  {
    cargoPresidente: {
      partido: FN,
      candidato: Pepepecas
    },
    cargoGobernador: {
      partido: PC,
      candidato: Pepepecas
    },
    cargoMunicipal: {
      partido: FN,
      candidato: Pepepecas
    },
    fecha: {
      dia: '30/nov/2023',
      hora: '12:00:00'
    },
    ubicacion: {
      lat: 123456789,
      lng: 123456789
    }
  }
*/