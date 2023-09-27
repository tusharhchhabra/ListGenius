const express = require('express');
const router  = express.Router();

const itemsQueries = require('../db/queries/items');
const { addCategory, getCategoriesIDForUser } = require('../db/queries/categories');

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

// Add Item
// curl test for item with existing category: curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "1", "category": "Movies", "userInput": "Saw"}' http://localhost:8080/api/items/1

// curl test for item with no existing category: curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "5", "category": "Travel", "userInput": "Japan"}' http://localhost:8080/api/items/1

router.post('/:id', async(req, res) => {

  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const userInputCategoryId = parseInt(req.body.categoryId);

  getCategoriesIDForUser(userId)
    .then((ids) => {
      console.log("ids:", ids);
      // Extract the IDs
      const categoryIdsArray = ids.map(catObj => catObj.categoryid);

      if (categoryIdsArray.includes(userInputCategoryId)) {
        return itemsQueries.addItem(userInputCategoryId, req.body.userInput);
      } else {
        return addCategory(userId, req.body.category)
          .then((result) => {
            res.send(result);
            const newCategoryId = result.id;
            return itemsQueries.addItem(newCategoryId, req.body.userInput);
          })
          .then((newItem) => {
            res.send(newItem);
          });
      }
    })
    .then(() => {
    })
    .catch((err) => {
      console.error("Error while processing:", err);
      res.status(500).json({ error: err.message });
    });
});

// Update Item
// curl test: curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Updated Item Name"}' http://localhost:8080/api/items/5

router.patch('/:id', (req, res) => {

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const itemName = req.body.name;
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

// Delete Item
// curl test: curl -X DELETE http://localhost:8080/api/items/5
router.delete('/:id', (req, res) => {

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const itemId = req.params.id;

  itemsQueries
    .deleteItem(itemId)
    .then(() => {
      res.send("Item Deleted ");
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;