const db = require('../connection');

/* Fetch Items related to a specific category */

const getItemsForCategory = (categoryId) => {
  const query = `SELECT items.*
  FROM items
  JOIN categories ON categories.id = items.categories_id
  WHERE categories_id = $1;`;
  return db.query(query,[categoryId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/* List all items from a user */

const getAllItemsOfUser = (userId) => {
  const query = `SELECT items.*
  FROM items
  JOIN categories ON categories.id = items.categories_id
  JOIN users ON users.id = owner_id
  WHERE owner_id = $1;`;
  return db.query(query,[userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addItem = (categoryId, name) => {
  const query = `INSERT INTO items(categories_id, name, created_at)
  VALUES ($1, $2, Now()) RETURNING id;`;
  return db.query(query, [categoryId, name])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

const deleteItem = (itemId) => {
  const query = `DELETE FROM items WHERE id = $1;`;
  return db.query(query, [itemId])
    .catch(error => {
      throw error;
    });
};

const updateItem = (item) => {
  const query = `UPDATE items
  SET name = $1, categories_id = $2
  WHERE id = $3;`
  return db.query(query,[item.name, parseInt(item.categories_id), parseInt(item.id)])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const updateItemName = (itemId, name) => {
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

const updateItemCategory = (itemId, categoryId) => {
  const query = `UPDATE items
  SET categories_id = $1
  WHERE id = $2;`
  return db.query(query,[categoryId, itemId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getItemsForCategory,
  getAllItemsOfUser,
  addItem,
  deleteItem,
  updateItem,
  updateItemName,
  updateItemCategory
};
