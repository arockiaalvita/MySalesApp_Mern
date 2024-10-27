const express = require('express');
const router = express.Router();
const SalesRep = require('../models/SalesRep'); // Adjust based on your model structure

// GET /api/profile/:id - Fetch a sales rep's profile data
router.get('/:id', async (req, res) => {
  try {
    const salesRep = await SalesRep.findById(req.params.id);
    if (!salesRep) return res.status(404).json({ message: 'Sales rep not found' });
    res.json(salesRep);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
