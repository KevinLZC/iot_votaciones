const mongoose = require("mongoose");
let VotacionesSchema = new mongoose.Schema({
  partido1: String,
  partido2: String,
  partido3: String,
  latitud: Number,
  longitud: Number,
  fecha: String,
  hora: String,
});

module.exports = mongoose.model("Votaciones", VotacionesSchema);