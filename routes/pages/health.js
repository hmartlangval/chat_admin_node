const express = require('express');
const router = express.Router();

// GET handler for health check
function get(req, res) {
  res.status(200).send('OK');
}

// Route handlers
router.get('/', get);

module.exports = router; 