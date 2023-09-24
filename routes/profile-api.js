const express = require('express');
const router  = express.Router();

const profileQueries = require('../db/queries/profile');

router.get('/', (req, res) => {
  profileQueries
    .getProfile()
    .then((profile) => {
      res.send({ profile });
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
  // Edit profile from user input
  const editProfile = req.body;
  editProfile.id = user_id;
  profileQueries
    .editProfile(editProfile)
    .then((profile) => {
      res.send(profile);
    })
    .catch((err) => {
      res.send(err.message);
    });
});


module.exports = router;