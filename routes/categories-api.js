const express = require('express');
const router  = express.Router();

const categoryQueries = require('../db/queries/categories');

router.get('/', (req, res) => {

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  categoryQueries
    .getUserCategories(userId)
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
