const express = require('express');
const router = express.Router();
const Plant = require('../models/Plant');
const UserPlant = require('../models/UserPlants')
const mongoose = require("mongoose");

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

// get plantcare
router.get("/plantcare", async (request, response) => {
  try {
    const plants = await Plant.find();
    response.status(200).json(plants);
  } catch (error) {
    response.status(500).json({ error: "Status code: 500 (Internal Server Error)" });
  }
});
// get individual plantcare
router.get("/plantcare/:plantCareId", async (request, response) => {
  const { plantCareId } = request.params;
  console.log(plantCareId)
  if (mongoose.isValidObjectId(plantCareId)) {
    try {
      const currentPlantCare = await Plant.findById(plantCareId);
      if (currentPlantCare) {
        response.json({ Plant: currentPlantCare });
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
// get all users plants
router.get("/userplants", async (request, response) => {
  try {
    const plants = await UserPlant.find();
    response.status(200).json(plants);
  } catch (error) {
    response.status(500).json({ error: "Status code: 500 (Internal Server Error)" });
  }
});

// post plantcare
router.post('/plantcare', async (request, response) => {
  try {
    const newPlantCare = await Plant.create(request.body)
    response.status(201).json({ Plant: newPlantCare })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})
//post user plant
router.post('/userplants/', async (request, response) => {
  try {
    const newUserPlant = await UserPlant.create(request.body)
    response.status(201).json({ UserPlant: newUserPlant })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})

// update existing plantcare
router.put('/plantcare/:plantCareId', async (request, response) => {
  const { plantCareId } = request.params;

  try {
    const updatePlant = await Plant.findByIdAndUpdate(plantCareId, request.body, { new: true })
    response.status(202).json({ Plant: updatePlant })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})
// update user plant
router.put('/userplants/:userPlantId', async (request, response) => {
  const { userPlantId } = request.params;

  try {
    const updateUserPlant = await UserPlant.findByIdAndUpdate(userPlantId, request.body, { new: true })
    response.status(202).json({ UserPlant: updateUserPlant })
  } catch (error) {
    console.log(error)
    response.status(400).json({ error })
  }
})

// delete plantcare
router.delete('/plantcare/:plantCareId', async (request, response) => {
  const { plantCareId } = request.params

  await Plant.findByIdAndDelete(plantCareId)
  response.status(202).json({ message: 'Plant deleted' })
})
// delete user plant
router.delete('/userplants/:userPlantId', async (request, response) => {
  const { userPlantId } = request.params

  await UserPlant.findByIdAndDelete(userPlantId)
  response.status(202).json({ message: 'Plant deleted' })
})

/* Make some routes there for what you need, don't forget that you can use your middleware where you define the use of this router */

module.exports = router
