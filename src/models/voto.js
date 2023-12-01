const mongoose = require("mongoose") // importando mongoose
// creando el esquema de la base de datos
let votoSchema = new mongoose.Schema({
  ID_Casilla: String,
  Datos: Array,
  timestamp: { type: Date, default: Date.now},
}, { collection: 'votos' }) // nombre de la colección en la base de datos

module.exports = mongoose.model("Voto", votoSchema)