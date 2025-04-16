const express = require('express');
const router = express.Router();

// GET handler for /api/items
function get(req, res) {
  // In a real app, this would fetch from a database
  res.json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
}

// POST handler for /api/items
function post(req, res) {
  // Example for handling POST requests
  const newItem = req.body;
  // In a real app, this would add to a database
  console.log('New item received:', newItem);
  res.status(201).json({ ...newItem, id: Math.floor(Math.random() * 1000) });
}

// Route handlers
router.get('/', get);
router.post('/', post);

module.exports = router; 