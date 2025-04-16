const express = require('express');
const router = express.Router();

// GET handler for /api/items/:id
function get(req, res) {
  const id = parseInt(req.params.id);
  // In a real app, this would fetch from a database
  if (id >= 1 && id <= 3) {
    res.json({ id, name: `Item ${id}` });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
}

// PUT handler for /api/items/:id
function put(req, res) {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  // In a real app, this would update in a database
  console.log(`Updating item ${id}:`, updatedItem);
  res.json({ ...updatedItem, id });
}

// DELETE handler for /api/items/:id
function del(req, res) {
  const id = parseInt(req.params.id);
  // In a real app, this would delete from a database
  console.log(`Deleting item ${id}`);
  res.json({ success: true, message: `Item ${id} deleted` });
}

// Route handlers
router.get('/:id', get);
router.put('/:id', put);
router.delete('/:id', del);

module.exports = router; 