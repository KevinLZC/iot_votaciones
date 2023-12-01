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

router.get("/deleteVotacion", (req, res) => {
  votoController.deleteAll(req, res)
})

router.get("/count", (req, res) => {
  votoController.getCount(req, res)
})

router.get("/getlastlocation", (req, res) => {
  votoController.getLastLocation(req, res)
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

router.get("/grafico", (req, res) => {
  res.render("grafico")
})

module.exports = router
