const express = require('express');
const router = express.Router();

router.get("/:id", (req, res) => {

  if (req.params.id) {
    res.cookie('user_id', 1);
  }

  res.redirect('/api/categories');
});

module.exports = router;
