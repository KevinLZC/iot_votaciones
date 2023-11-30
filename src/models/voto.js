const mongoose = require("mongoose");
let votoSchema = new mongoose.Schema({
  cargoPresidente: {
    type: Object,
    required: true,
  },
  cargoGobernador: {
    type: Object,
    required: true,
  },
  cargoMunicipal: {
    type: Object,
    required: true,
  },
  fecha: {
    type: Object,
    required: true,
  },
  ubicacion: {
    type: Object,
    required: true,
  },
}, { collection: 'votos' });

module.exports = mongoose.model("Voto", votoSchema);