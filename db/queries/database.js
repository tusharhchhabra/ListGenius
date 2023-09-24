const db = require('../connection');

/* Fetch all users */
const getUsers = (id) => {
  const query = `SELECT * FROM users WHERE id = $1;`
  return db.query(query,[id])
    .then(data => {
      return data.rows[0];
    });
};

/* Fetch Categories and count of all items in that particular*/

const getCategory = (id) => {
  const query = `SELECT categories.*, COUNT(items.id) AS total_items
  FROM categories
  JOIN items
  ON categories.id = categories_id
  WHERE categories.id = $1
  GROUP BY categories.id;`;
  return db.query(query,[id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

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
  getUsers,
  getCategory,
  getItem,
  getAllItemsOfUser
};
