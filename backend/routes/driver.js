const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Driver Schema
const driverSchema = new mongoose.Schema({
  userId:String,
  name: String,
  phone: { type: String, unique: true },
  password: String,
  olaid: String,
  vehicle: String,
  license: String,
  vtype: String,
  city: String,
  status: { type: String, default: 'pending' },
  rating: { type: Number, default: 4.5 },
  trips: { type: Number, default: 0 },
  registeredAt: { type: String, default: () => new Date().toLocaleDateString('en-IN') },
});

const Driver = mongoose.model('Driver', driverSchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  role: String,
});

const User = mongoose.model('User', userSchema);

// Register Driver
router.post('/register', async (req, res) => {
  try {
    const { name, phone, password, olaid, vehicle, license, vtype, city } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Account already exists' });
    }

    const newUser = new User({ name, phone, password, role: 'driver' });
    await newUser.save();

    const newDriver = new Driver({
      name, phone, password, olaid, vehicle, license, vtype, city,
      userId: newUser._id,
    });
    await newDriver.save();

    res.json({ message: 'Driver registered successfully', user: newUser, driver: newDriver });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { phone, password, role } = req.body;
    const user = await User.findOne({ phone, password, role });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Register Passenger
router.post('/register-passenger', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'Account already exists' });
    }
    const newUser = new User({ name, phone, password, role: 'passenger' });
    await newUser.save();
    res.json({ message: 'Passenger registered successfully', user: newUser });
  } catch (err) {
  console.error('REGISTER ERROR:', err.message);
  console.error('FULL ERROR:', JSON.stringify(err));
  res.status(500).json({ message: 'Server error', error: err.message });
}
});

// Verify Driver by phone
router.get('/verify/:phone', async (req, res) => {
  try {
    const driver = await Driver.findOne({ phone: req.params.phone });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ driver });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all drivers — Admin
router.get('/all', async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json({ drivers });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Approve Driver — Admin
router.put('/approve/:id', async (req, res) => {
  try {
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json({ message: 'Driver approved', driver });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Reject Driver — Admin
router.delete('/reject/:id', async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    res.json({ message: 'Driver rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const driver = await Driver.findOne({ userId: req.params.userId });
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.json({ driver });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;