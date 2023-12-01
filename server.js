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

const clientId = 'ws_' + Math.random().toString(16).substr(2, 8);
const host = `mqtt://test.mosquitto.org:1883`;
const options = {
  clientId,
  clean: true,
  connectTimeout: 4000,
  reconnectPeriod: 1000,
};
const client = mqtt.connect(host, options)

client.subscribe("/iot/votaciones/test", (error) => {
  if (error) {
    console.log('subscribe error:', error);
    return;
  }
  console.log(`Subscribe to topic /iot/votaciones/test`);
});

let websocket

client.on('message', (topic, message) => {
  message = message.toString();
  if(websocket){
    websocket.send(message)
  }
});

wss.on("connection", (ws) => {
  websocket = ws
});

const PORT = process.env.PORT || 3000

Server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})