const express = require('express');
const path = require('path');
const router = express.Router();

// GET handler for admin settings page
function get(req, res) {
  res.sendFile(path.join(__dirname, '../../../public/admin.html'));
}

// Route handlers
router.get('/', get);

module.exports = router; 