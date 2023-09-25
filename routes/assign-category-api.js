const express = require('express');
const router  = express.Router();

const assignCategoryQueries = require('../db/queries/assigncategory');

router.get('/', (req, res) => {
  assignCategoryQueries
    .assignCategory()
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
  // set user_id to cookie id
  const user_id = req.session.user_id;
  // validate cookie
  if (!user_id) {
    return res.send({ error: "error" });
  }
  // create new category from user input
  const newCategory = req.body;
  newCategory.owner_id = user_id;
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