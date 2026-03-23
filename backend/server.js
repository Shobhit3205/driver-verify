require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connect


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'DriverVerify Backend Running!' });
});

// Routes
const driverRoutes = require('./routes/driver');
app.use('/api/drivers', driverRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//console.log("URI:", process.env.MONGO_URI);
//console.log("CHECK:", process.env.MONGO_URI);
