const express = require('express');
const router  = express.Router();

const assignCategoryQueries = require('../db/queries/assigncategory');

router.get('/', (req, res) => {

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  assignCategoryQueries
    .assignCategory(userId)
    .then((categories) => {
      res.send({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  const newCategory = req.body;
  newCategory.owner_id = userId;
  assignCategoryQueries
    .addCategory(newCategory)
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
