const express = require('express');
const router = express.Router();

const categoryQueries = require('../db/queries/categories');
const itemsForCategoryQueries = require('../db/queries/items');

// Get all categories from a user
router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  categoryQueries
    .getCategoriesForUser(userId)
    .then((categories) => {
      res.json({ categories });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get all items for a category from a user
router.get('/:id', (req, res) => {

  const userId = req.cookies.user_id;
  const categoryId = req.params.id;
  console.log("req.params.id", req.params.id);

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  itemsForCategoryQueries
    .getItemsForCategory(userId, categoryId)
    .then((items) => {
      res.send({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Add category

router.post('/', (req, res) => {

  const userId = 1;
  req.cookies.user_id;

  // if (!req.cookies || !req.cookies.user_id) {
  //   return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  // }

  const categoryName = req.body.name;
  const owner_id = userId;
  // const categoryId = ? I think this is auto added?

  categoryQueries
    .addCategory(owner_id, categoryName)
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// Update a category
router.patch('/:id', (req, res) => {

  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const categoryName = req.body.name;
  // const owner_id = userId;
  const categoryId = req.params.id;

  categoryQueries
    .updateCategory(categoryId, categoryName)
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// Delete a category
router.delete('/:id', (req, res) => {

  // const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  // const categoryName = req.body.name;
  // const owner_id = userId;
  const categoryId = req.params.id;

  categoryQueries
    .deleteCategory(categoryId)
    .then((category) => {
      res.send(category);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
