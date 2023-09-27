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

const findNextCategoryId = () => {
  const query = `SELECT categories_id FROM items ORDER BY categories_id DESC LIMIT 1;`;
  return db.query(query)
    .then(data => {
      const highestCategoryId = data.rows[0].categories_id; // Access the 'categories_id' column
      return parseInt(highestCategoryId) + 1; // Convert to integer and add 1
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
  updateItemName,
  updateItemCategory,
  findNextCategoryId
};
