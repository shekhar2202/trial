const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Complaint = require('../models/Complaint');
const { auth, adminAuth } = require('../middleware/auth');

// @route   POST api/complaints
// @desc    Create a complaint
// @access  Private
router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('contact', 'Contact is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, contact, description } = req.body;

    const newComplaint = new Complaint({
      name,
      email,
      contact,
      description,
      submittedBy: req.user.id
    });

    const complaint = await newComplaint.save();
    res.json(complaint);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/complaints
// @desc    Get all complaints (admin) or user's complaints (student)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    let complaints;
    if (req.user.role === 'admin') {
      complaints = await Complaint.find().populate('submittedBy', ['name', 'username']);
    } else {
      complaints = await Complaint.find({ submittedBy: req.user.id });
    }
    res.json(complaints);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/complaints/:id
// @desc    Get complaint by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('submittedBy', ['name', 'username']);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user can access this complaint
    if (req.user.role !== 'admin' && complaint.submittedBy._id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(complaint);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/complaints/:id/status
// @desc    Update complaint status (admin only)
// @access  Private
router.put('/:id/status', [adminAuth, [
  check('status', 'Status is required').isIn(['pending', 'in-progress', 'resolved'])
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    complaint.status = req.body.status;
    await complaint.save();

    res.json(complaint);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/complaints/:id
// @desc    Delete complaint
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Check if user can delete this complaint
    if (req.user.role !== 'admin' && complaint.submittedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await complaint.remove();
    res.json({ message: 'Complaint removed' });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 