const Voto = require("../models/voto")

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
      ],
    })
    nuevoVoto
      .save()
      .then((data) => {
        res.status(200).json({ message: 'Operación exitosa' });
      })
      .catch((error) => {
        console.error('Error al guardar el voto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
      });
  },
  getCount: async (req, res) => {
    let candidatos = [
      [
        "Julieta Miramontes",
        "Maximiliano Ortíz",
        "Hiromi Mayoral",
      ],
      [
        "Axel Mora",
        "Lina Diaz",
        "Victor Barboza ",
      ],
      [
        "Federico Aguilar",
        "Teodoro Brambilia",
        "Gabriela Gallardo",
      ],
    ]

    let conteo = []

    for (let candidatura = 0; candidatura < candidatos.length; candidatura++) {
      for (let candidato = 0; candidato < candidatos[candidatura].length; candidato++) {
        let filter = `Datos.${candidatura}.Candidato`
        conteo.push(Voto.countDocuments({ [filter]: candidatos[candidatura][candidato] })
          .then((data) => {
            return {
              nombre: candidatos[candidatura][candidato],
              noVotos: data
            }
          }))
      }
    }
    Promise.all(conteo).then((data) => {
      res.json(data)
    })
  },
  getLastLocation: async (req, res) => {
    let data = await Voto.find().exists("timestamp").sort({timestamp: -1}).limit(1)
    res.json(data[0])
  },
  deleteAll: async (req, res) => {
    await Voto.deleteMany({})
    res.json({message: "Datos eliminados"})
  }
}