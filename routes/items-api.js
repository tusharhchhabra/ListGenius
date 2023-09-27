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


// curl test for item with existing category: curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "1", "category": "Movies", "userInput": "Saw"}' http://localhost:8080/api/items/1


// curl test for item with no existing category: curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "5", "category": "Travel", "userInput": "Japan"}' http://localhost:8080/api/items/1

router.post('/:id', async(req, res) => {

  // const userId = req.cookies.user_id;

  // if (!req.cookies || !req.cookies.user_id) {
  //   return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  // }

  const userId = 1;
  const userInputCategoryId = parseInt(req.body.categoryId); // Convert to integer

  getCategoriesIDForUser(userId)
    .then((ids) => {
      console.log("ids:", ids);
      const categoryIdsArray = ids.map(catObj => catObj.categoryid); // Extract just the IDs

      if (categoryIdsArray.includes(userInputCategoryId)) {
        console.log("Category exists, adding item...");
        return itemsQueries.addItem(userInputCategoryId, req.body.userInput);
      } else {
        console.log("Category does not exist, creating category...");
        return addCategory(userId, req.body.category)
          .then((result) => {
            const newCategoryId = result.id;  // Extracting the actual ID
            console.log("Created new category with ID:", newCategoryId);
            console.log("Adding item to the new category...");
            return itemsQueries.addItem(newCategoryId, req.body.userInput);
          });
      }
    })
    .then((newItem) => {
      res.send(newItem);
    })
    .catch((err) => {
      console.error("Error while processing:", err);
      res.status(500).json({ error: err.message });
    });
});


// Update Item
// cur test: curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Updated Item Name"}' http://localhost:8080/api/items/5


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

// Delete Item
// curl test: curl -X DELETE http://localhost:8080/api/items/5

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
