const express = require('express');
const router = express.Router();

// localhost:3000/login/1
router.get("/", (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/api/categories');
});

module.exports = { router };
