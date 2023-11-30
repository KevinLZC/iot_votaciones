const Voto = require("../models/voto")
const Estado = require("../models/estado");

module.exports = {
  addVoto: (req, res) => {
    const nuevoVoto = Voto({
      ID_Casilla: req.body.ID_Casilla,
      Datos: [
        {
          Partido: req.body.Datos[0].Partido,
          Candidatura: req.body.Datos[0].Candidatura,
          Candidato: req.body.Datos[0].Candidato
        },
        {
          Partido: req.body.Datos[1].Partido,
          Candidatura: req.body.Datos[1].Candidatura,
          Candidato: req.body.Datos[1].Candidato
        },
        {
          Partido: req.body.Datos[2].Partido,
          Candidatura: req.body.Datos[2].Candidatura,
          Candidato: req.body.Datos[2].Candidato
        },
        {
          Fecha: req.body.Datos[3].Fecha,
          Hora: req.body.Datos[3].Hora
        },
        {
          Latitud: req.body.Datos[4].Latitud,
          Longitud: req.body.Datos[4].Longitud
        }
      ]
    })
    nuevoVoto
      .save()
      .then((data) => {
        console.log(data)
        res.status(200).json({ message: 'Operación exitosa' });
      })
      .catch((error) => {
        console.error('Error al guardar el voto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  updateEstado: async (req, res) => {
    const update = { nombre: "Kevin" }
    const filter = { partido: req.body.partido, nombre: req.body.candidato }
    let estado = Estado.find({ filter })
    console.log(estado.estado)
  }
}