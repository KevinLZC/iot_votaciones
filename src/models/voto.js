const mongoose = require("mongoose");
let votoSchema = new mongoose.Schema({
  ID_Casilla: String,
  Datos: Array,
  timestamp: { type: Date, default: Date.now},
}, { collection: 'votos' });

module.exports = mongoose.model("Voto", votoSchema);