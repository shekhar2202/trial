const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

// @route   GET api/users
// @desc    Get all users (admin only)
// @access  Private
router.get('/', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/students
// @desc    Get all students (admin only)
// @access  Private
router.get('/students', adminAuth, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 