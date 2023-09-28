const express = require('express');
const router = express.Router();

const { getUser } = require("../db/queries/users")

router.get("/:id", (req, res) => {

  if (req.params.id) {
    res.cookie('user_id', 1);
  }

  getUser(1)
    .then(user => {
      res.send({ user })
    });
});

module.exports = router;
