const Voto = require("../models/voto")

module.exports = {
  addVoto: (req, res) => {
    const nuevoVoto = Voto({
      cargoPresidente: {
        partido: req.body.cargoPresidente.partido,
        candidato: req.body.cargoPresidente.candidato,
      },
      cargoGobernador: {
        partido: req.body.cargoGobernador.partido,
        candidato: req.body.cargoGobernador.candidato,
      },
      cargoMunicipal: {
        partido: req.body.cargoMunicipal.partido,
        candidato: req.body.cargoMunicipal.candidato,
      },
      fecha: {
        dia: req.body.fecha.dia,
        hora: req.body.fecha.hora,
      },
      ubicacion: {
        lat: req.body.ubicacion.lat,
        lng: req.body.ubicacion.lng,
      },

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
}