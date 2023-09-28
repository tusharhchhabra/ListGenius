const express = require('express');
const router = express.Router();

router.get("/:id", (req, res) => {

  if (req.params.id) {
    res.cookie('user_id', 1);
  }
  const user = {
    id: 1,
    name: "Jim",
    email_adress: "jim@munderdifflin.com"
  };
  res.send({ user })
});

module.exports = router;
