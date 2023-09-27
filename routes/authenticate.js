const express = require('express');
const router = express.Router();

// Define a route with a parameter named 'id'
// This will match URLs like localhost:3000/login/1
router.get("/:id", (req, res) => {
  if (req.params.id) {
    res.cookie('user_id', 1);
  }

  // Redirect to another route
  res.redirect('/api/categories');
});


module.exports = router;
