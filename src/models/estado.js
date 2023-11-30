const mongoose = require("mongoose");
let estadoSchema = new mongoose.Schema({
  partidoFN: {
    type: Array,
    required: true,
  },
  partidoUP: {
    type: Array,
    required: true,
  },
  partidoPC: {
    type: Array,
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
}, { collection: 'estado' });

module.exports = mongoose.model("Estado", estadoSchema);