const db = require('../connection');

/* Fetch all users */
const getUser = (userId) => {
  const query = `SELECT * FROM users WHERE id = $1;`
  return db.query(query,[userId])
    .then(data => {
      return data.rows[0];
    });
};

const updateUser = (userId, name, email) => {
  const query = `UPDATE users
  SET name = $1, email_address = $2
  WHERE id = $3;`
  return db.query(query,[name, email, userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUsers,
  updateUser
};
