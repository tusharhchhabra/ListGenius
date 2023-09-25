const express = require('express');
const router  = express.Router();

const categoryQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  categoryQueries
    .getUserCategories()
    .then((categories) => {
      res.send({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = router;