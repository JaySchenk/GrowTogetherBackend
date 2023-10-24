const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.get("/plantcare", async (request, response) => {
  try {
    const plants = await Plant.find();
    response.status(200).json(plants);
  } catch (error) {
    response.status(500).json({ error: "Status code: 500 (Internal Server Error)" });
  }
});

router.get("/plantcare/:plantCareId", async (request, response) => {
  const { plantCareId } = request.params;
  console.log(plantCareId)
  if (mongoose.isValidObjectId(plantCareId)) {
    try {
      const currentPlantCare = await Plant.findById(plantCareId);
      if (currentPlantCare) {
        response.json({ student: currentPlantCare });
      } else {
        response.status(404).json({ message: "Plantcare instructions not found" });
      }
    } catch (error) {
      console.log(error);
      response.status(400).json({ error });
    }
  } else {
    response.status(400).json({ message: "The id seems wrong" });
  }
});

/* Make some routes there for what you need, don't forget that you can use your middleware where you define the use of this router */

module.exports = router
