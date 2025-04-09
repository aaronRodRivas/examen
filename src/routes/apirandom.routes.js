const express = require("express");
const router = express.Router();

router.get("/apirandom/beers/:size", async (req, res) => {
  try {
    const { size } = req.params;
    const response = await fetch("https://random-data-api.com/api/v2/beers?size=" + size);
    const beersArray = await response.json();
    res.json({ message: "Beers fetch successful", beersArray });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;