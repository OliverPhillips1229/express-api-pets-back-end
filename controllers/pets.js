const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();
const cors = require('cors');

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

router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);
    } catch (err) {
        res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
});

router.get('/:petId', async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);
        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.status(200).json(foundPet);
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            // Add else statement to handle all other errors
            res.status(500).json({ err: err.message });
        }
    }
});

router.delete('/:petId', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
        if (!deletedPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.status(200).json({ message: 'Pet deleted successfully.' });
    } catch (err) {
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

router.put('/:petId', async (req, res) => {
    try {
        const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {
            new: true,
        });
        if (!updatedPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }
        res.status(200).json(updatedPet);
    } catch (err) {
        // Add code for errors
        if (res.statusCode === 404) {
            res.json({ err: err.message });
        } else {
            res.status(500).json({ err: err.message });
        }
    }
});

// Export the router at the bottom of the file
module.exports = router;
