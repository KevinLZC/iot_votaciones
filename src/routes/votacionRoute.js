const express = require("express") // importando express
const votoController = require("../controllers/votacion") // importando el controlador
const router = express.Router() // creando el enrutador

// configurando el enrutador

// ruta para la página principal
router.get("/", (req, res) => {
  const API_KEY = process.env.API_KEY

  res.render("index",
    {
      API_KEY: API_KEY,
    })
})

// ruta para la agregar los votos a la base de datos
router.post("/addVotacion", (req, res) => {
  votoController.addVoto(req, res)
})

// ruta para eliminar todas las votaciones de la base de datos
router.get("/deleteVotacion", (req, res) => {
  votoController.deleteAll(req, res)
})

// ruta para contar los votos por cada uno de los candidatos
router.get("/count", (req, res) => {
  votoController.getCount(req, res)
})

// ruta para obtener la última ubicación del voto
router.get("/getlastlocation", (req, res) => {
  votoController.getLastLocation(req, res)
})

// ruta para acceder a la página de presidentes
router.get("/presidente", (req, res) => {
  res.render("presidente")
})

// ruta para acceder a la página de gobernadores
router.get("/gobernador", (req, res) => {
  res.render("gobernador")
})

// ruta para acceder a la página de los presidentes municipales
router.get("/municipal", (req, res) => {
  res.render("municipal")
})

// ruta para acceder a la página de las gráficos
router.get("/grafico", (req, res) => {
  res.render("grafico")
})

module.exports = router
