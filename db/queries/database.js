const db = require('../connection');

/* Fetch all users */
const getUsers = (id) => {
  const query = `SELECT * FROM users WHERE id = $1;`
  return db.query(query,[id])
    .then(data => {
      return data.rows[0];
    });
};

/* Fetch Categories */

const getCategory = (id) => {
  const query = `SELECT * FROM categories WHERE owner_id = $1 ;`;
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

module.exports = {
  getUsers,
  getCategory,
  getItem
};
