const express = require('express');
const path = require('path');
const router = express.Router();

// GET handler for main page
function get(req, res) {
  res.sendFile(path.join(__dirname, '../../public', 'index.html'));
}

// Route handlers
router.get('/', get);

module.exports = router; 