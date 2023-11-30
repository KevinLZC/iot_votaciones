const express = require("express")
const votoController = require("../controllers/votacion")
const router = express.Router()

router.get("/", (req, res) => {
  const API_KEY = process.env.API_KEY

  res.render("index",
    {
      API_KEY: API_KEY,
    })
})

router.post("/addVotacion", (req, res) => {
  votoController.addVoto(req, res)
})

router.get("/presidente", (req, res) => {
  res.render("presidente")
})

router.get("/gobernador", (req, res) => {
  res.render("gobernador")
})

router.get("/municipal", (req, res) => {
  res.render("municipal")
})

router.post("/addVotación", (req, res) => {
  // ruta para mandar la información a la base de datos
  let rings = false;
  if (req.body.rings === "on") {
    rings = true;
  }
  const newPlanet = Planet({
    name: req.body.name,
    orderFromSun: req.body.order,
    hasRings: rings,
    mainAtmosphere: req.body.atmosphere.split(","),
    surfaceTemperatureC: {
      min: req.body.min,
      mean: req.body.mean,
      max: req.body.max,
    },
  });
  newPlanet
    .save() // se guarda el documento (función asincrona)
    .then((data) => {
      res.redirect("/planets");
    }) // nos redirecciona a la tabla con todos los planetas
    .catch((error) => {
      res.json({ message: error });
    }); // nos regresa un error
});

module.exports = router
