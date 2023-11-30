const mongoose = require("mongoose");
let votoSchema = new mongoose.Schema({
  ID_Casilla: String,
  Datos: Array
}, { collection: 'votos' });

module.exports = mongoose.model("Voto", votoSchema);