const mongoose = require("mongoose");
let estadoSchema = new mongoose.Schema({
  ID_Casilla: String,
  Datos: Array
}, { collection: 'estado' });

module.exports = mongoose.model("Estado", estadoSchema);