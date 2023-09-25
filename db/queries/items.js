const db = require('../connection');

/* Fetch Items related to a specific category */

const getItem = (categoryId) => {
  const query = `SELECT *
  FROM items
  JOIN categories
  ON categories.id = categories_id
  WHERE categories_id = $1;`
  return db.query(query,[categoryId])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/* List all items from a user */

const getAllItemsOfUser = (userId) => {
  const query = `SELECT *
  FROM items
  JOIN users
  ON users.id = owner_id
  WHERE users.id = $1;`
  return db.query(query,[userId])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getItem,
  getAllItemsOfUser
};
