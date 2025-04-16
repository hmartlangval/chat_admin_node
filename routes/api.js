const express = require('express');
const router = express.Router();

// Example API endpoints
router.get('/status', (req, res) => {
  res.json({ status: 'online', time: new Date() });
});

// Example resource endpoint
router.get('/items', (req, res) => {
  // In a real app, this would fetch from a database
  res.json([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' }
  ]);
});

router.post('/items', (req, res) => {
  // Example for handling POST requests
  const newItem = req.body;
  // In a real app, this would add to a database
  console.log('New item received:', newItem);
  res.status(201).json({ ...newItem, id: Math.floor(Math.random() * 1000) });
});

// Add more API endpoints as needed
router.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // In a real app, this would fetch from a database
  if (id >= 1 && id <= 3) {
    res.json({ id, name: `Item ${id}` });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

router.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  // In a real app, this would update in a database
  console.log(`Updating item ${id}:`, updatedItem);
  res.json({ ...updatedItem, id });
});

router.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // In a real app, this would delete from a database
  console.log(`Deleting item ${id}`);
  res.json({ success: true, message: `Item ${id} deleted` });
});

module.exports = router; 