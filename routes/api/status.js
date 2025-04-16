const express = require('express');
const router = express.Router();

// GET handler for /api/status
function get(req, res) {
  res.json({ status: 'online', time: new Date() });
}

// Route handlers
router.get('/', get);

module.exports = router; 