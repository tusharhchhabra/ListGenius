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

const createItem = (owner_id, categoryId, name) => {
  const query = `INSERT INTO items(owner_id, categories_id, name, created_at)
  VALUES ($1, $2, $3, now()) RETURNING id;`
  return db.query(query, [owner_id, categoryId, name])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

const deleteItem = (itemId) => {
  const query = `DELETE FROM categories WHERE id = $1;`
  return db.query(query, [itemId])
    .catch(error => {
      throw error;
    });
};

const updateItem = (itemId, name) => {
  const query = `UPDATE items
  SET name = $1
  WHERE id = $2;`
  return db.query(query,[name, itemId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};



module.exports = {
  getItem,
  getAllItemsOfUser,
  createItem,
  deleteItem,
  updateItem
};
