const express = require('express');
const router  = express.Router();

const itemsQueries = require('../db/queries/items');

router.get('/items', (req, res) => {

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  itemsQueries
    .getItems(userId)
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

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;
  // create new item from user input
  const newItem = req.body;
  newItem.owner_id = userId;
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
