const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path according to your project structure
const crypto = require('crypto');
const nodemailer = require('nodemailer'); // For sending emails
const SalesRep = require('../models/SalesRep');

const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  const { name, email, age, contactNumber, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, age, contactNumber, role, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
    // Send verification email logic can be added here
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Get all sales reps
router.get('/salesreps', async (req, res) => {
  try {
    const salesReps = await User.find({ role: 'salesrep' });
    res.json(salesReps);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales reps' });
  }
});

// Forget Password Route
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Generate a reset token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Send email with the reset link
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset-password/${token}`; // Frontend route to handle password reset
    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: 'Reset link sent to your email' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred. Please try again.' });
  }
});

router.put('/salesreps/:id/tasks', async (req, res) => {
    const { tasks } = req.body; // Get tasks from the request body
    try {
      const updatedRep = await SalesRep.findByIdAndUpdate(
        req.params.id,
        { tasks }, // Assuming tasks is an array of task objects
        { new: true }
      );
      if (!updatedRep) {
        return res.status(404).json({ message: 'Sales Rep not found' });
      }
      res.json(updatedRep);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  // Update user route
router.put('/salesreps/:id', async (req, res) => {
  try {
    const updatedRep = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );

    if (!updatedRep) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedRep);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

  router.delete('/salesreps/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/salesreps/:id', async (req, res) => {
    try {
      const salesRep = await SalesRep.findById(req.params.id);
      if (!salesRep) {
        return res.status(404).json({ message: 'Sales Rep not found' });
      }
      res.json(salesRep);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update user route
router.put('/salesreps/:id', async (req, res) => {
  try {
    const updatedRep = await User.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );

    if (!updatedRep) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedRep);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
