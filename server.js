const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const cors = require('cors');

const petRouter = require('./controllers/pets.js');

app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.json());

// Add the petRouter to the `/pets` route
app.use('/pets', petRouter);

app.listen(3000, () => {
  console.log('The express app is ready!');
});
