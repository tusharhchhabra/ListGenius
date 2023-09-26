/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const profileQueries = require('../db/queries/users.js');
// Get user details
router.get('/', (req, res) => {
  profileQueries
    .getUsers()
    .then((profile) => {
      res.send({ profile });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Update User Details
router.post('/', (req, res) => {
  // set user_id to cookie id
  const user_id = req.session.user_id;
  // validate cookie
  if (!user_id) {
    return res.send({ error: "error" });
  }
  // Edit profile from user input
  const updateUser = req.body;
  updateUser.id = user_id;
  profileQueries
    .updateUser(updateUser)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err.message);
    });
});


module.exports = router;
