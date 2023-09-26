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

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to view your profile.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  profileQueries
    .getUsers(userId)
    .then((user) => {
      res.send({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// Update User Details
router.post('/', (req, res) => {

  if (!req.session || !req.session.user_id) {
    window.alert('Please sign up or log in to create lists.');
    return res.redirect('/home');
  }

  const userId = req.session.user_id;

  // Edit profile from user input
  const updateUser = req.body;
  updateUser.id = userId;
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
