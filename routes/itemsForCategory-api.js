const express = require('express');
const router  = express.Router();

const itemsForCategoryQueries = require('../db/queries/categories');

router.get('/', (req, res) => {
  itemsForCategoryQueries

 if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

    .getItemsForCategory(userId)
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
