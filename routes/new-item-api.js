const express = require('express');
const router  = express.Router();

const itemsQueries = require('../db/queries/items');

router.get('/items', (req, res) => {
  itemsQueries
    .getItems()
    .then((items) => {
      res.send({ items });
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
  // create new item from user input
  const newItem = req.body;
  newItem.owner_id = user_id;
  itemsQueries
    .addItems(newItem)
    .then((newItem) => {
      res.send(newItem);
    })
    .catch((err) => {
      res.send(err.message);
    });
});


module.exports = router;