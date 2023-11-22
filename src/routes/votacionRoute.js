const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  const API_KEY = process.env.API_KEY,
        EMQX_HOST = process.env.EMQX_HOST,
        EMQX_PORT = process.env.EMQX_PORT,
        EMQX_USERNAME = process.env.EMQX_USERNAME,
        EMQX_PASSWORD = process.env.EMQX_PASSWORD,
        EMQX_TOPIC = process.env.EMQX_TOPIC


  res.render("index",
    {
      API_KEY: API_KEY,
      EMQX_HOST: EMQX_HOST,
      EMQX_PORT: EMQX_PORT,
      EMQX_USERNAME: EMQX_USERNAME,
      EMQX_PASSWORD: EMQX_PASSWORD,
      EMQX_TOPIC: EMQX_TOPIC
    })
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
