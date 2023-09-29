const express = require('express');
const router = express.Router();

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
// curl test for item with no existing category: curl -X POST -H "Content-Type: application/json" -d '{"category":"Games", "userInput": "Catan"}' http://localhost:8080/api/items/

// curl test for item with existing category: curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "1", "userInput": "Saw"}' http://localhost:8080/api/items/

// curl -X POST -H "Content-Type: application/json" -d '{"categoryId": "5", "userInput": "Monopoly"}' http://localhost:8080/api/items/

router.post('/', async (req, res) => {

  const userId = req.cookies.user_id;

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const itemName = req.body.itemName;
  const existingCategoryId = parseInt(req.body.categoryId);
  const newCategoryName = req.body.newCategoryName;

  console.log(req.body);
  let newCategory = null;

  if (existingCategoryId) {
    itemsQueries.addItem(existingCategoryId, itemName)
      .then((item) => {
        console.log("add item returns", item);
        return res.send({ item });
      });
  } else {
    addCategory(userId, newCategoryName)
      .then((newCategory) => {
        console.log("add cat result", newCategory);
        return itemsQueries.addItem(newCategory.id, itemName)
          .then((item) => {
            console.log("add item returns", item);
            return res.send({ item, newCategory });
          });
      })
      .catch((err) => {
        console.error("Error while creating category:", err);
        res.status(500).json({ error: err.message });
      });
  }

  // getCategoriesIDForUser(userId)
  //   .then((ids) => {
  //     const categoryIdsArray = ids.map(catObj => catObj.categoryid);
  //     console.log("returned cats", categoryIdsArray);

  //     if (categoryIdsArray.includes(userInputCategoryId)) {
  //       return itemsQueries.addItem(userInputCategoryId, req.body.userInput);
  //     } else {
  //       return addCategory(userId, req.body.category)
  //         .then((result) => {
  //           // res.send(result);
  //           console.log("add cat result", result);
  //           const newCategoryId = result.id;
  //           return itemsQueries.addItem(newCategoryId, req.body.userInput);
  //         })
  //         .then((newItem) => {
  //           // return res.send(newItem);
  //         });
  //     }
  //   })
  //   .then((result) => {
  //     console.log("Result", result);
  //     return res.send("Success!");
  //   })
  //   .catch((err) => {
  //     console.error("Error while processing:", err);
  //     res.status(500).json({ error: err.message });
  //   });
});

// Update Item
// curl test: curl -X PATCH -H "Content-Type: application/json" -d '{"name": "Updated Item Name"}' http://localhost:8080/api/items/5

router.patch('/:id', (req, res) => {

  if (!req.cookies || !req.cookies.user_id) {
    return res.status(401).json({ message: 'Please sign up or log in to create lists.' });
  }

  const item = req.body.item;

  itemsQueries
    .updateItem(item)
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
