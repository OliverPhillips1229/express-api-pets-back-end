const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

// Write your routes/controller functions here
router.post('/', async (req, res) => {
  try {
    // Create a new pet with the data from req.body
    const createdPet = await Pet.create(req.body);
    res.status(201).json(createdPet); // 201 Created
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});
// Export the router at the bottom of the file
module.exports = router;
