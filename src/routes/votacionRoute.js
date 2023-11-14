const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
  const API_KEY = process.env.API_KEY
  res.render("index",
    {
      API_KEY: API_KEY,
    })
})

module.exports = router
