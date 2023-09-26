const express = require('express');
const router  = express.Router();

const itemsForCategoryQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  itemsForCategoryQueries
    .getItemsForCategory()
    .then((items) => {
      res.send({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


module.exports = { router };
