const express = require('express');
const router  = express.Router();

const itemsQueries = require('../db/queries/items');
const { addCategory } = require('../db/queries/categories');

router.get('/', (req, res) => {
  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  itemsQueries
    .getAllItemsOfUser(userId)
    .then((items) => {
      res.send({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/:id', (req, res) => {

  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  // const userId = 1;
  const newItem = req.body;
  const newItemName = req.body.userInput;


  let categoryId;

  switch (req.body.category) {
  case "Movies":
    categoryId = 1;
    break;
  case "Eat":
    categoryId = 2;
    break;
  case "Read":
    categoryId = 3;
    break;
  case "Buy":
    categoryId = 4;
    break;
  default:
    addCategory(userId, req.body.category)
      .then((result) => {
        // Assuming addCategory returns the newly created category ID
        categoryId = result;
        newItem.owner_id = userId;
        const categoryName = req.body.category;

        // Get the next category ID
        itemsQueries.findNextCategoryId()
          .then((nextCategoryId) => {
            categoryId = parseInt(nextCategoryId);

            // Add the item with the new category ID
            itemsQueries
              .addItem(userId, categoryId, newItemName)
              .then((newItem) => {
                res.send(newItem);
              })
              .catch((err) => {
                res.status(500).json({ error: err.message });
              });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
    break;
  }
});



router.patch('/:id', (req, res) => {

  // const userId = req.cookies.user_id;

  // if (!req.cookies || !req.cookies.user_id) {
  //   return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  // }

  // const userId = 1;

  const itemName = req.body.name;
  // const owner_id = userId;
  const itemId = req.params.id;


  itemsQueries
    .updateItem(itemId, itemName)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.delete('/:id', (req, res) => {

  // const userId = req.cookies.user_id;

  // if (!req.cookies || !req.cookies.user_id) {
  //   return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  // }

  // const categoryName = req.body.name;
  // const owner_id = userId;
  const itemId = req.params.id;


  itemsQueries
    .deleteItem(itemId)
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
