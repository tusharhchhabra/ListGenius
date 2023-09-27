const db = require('../connection');

/* Fetch Items related to a specific category */

const getItemsForCategory = (userId, categoryId) => {
  const query = `SELECT items.name
  FROM items
  JOIN users
  ON users.id = owner_id
  WHERE users.id = $1 and categories_id = $2
  GROUP BY items.name;`;
  return db.query(query,[userId, categoryId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/* List all items from a user */

const getAllItemsOfUser = (userId) => {
  const query = `SELECT items.name
  FROM items
  JOIN users
  ON users.id = owner_id
  WHERE users.id = $1;`;
  return db.query(query,[userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addItem = (owner_id, categoryId, name) => {
  const query = `INSERT INTO items(owner_id, categories_id, name, created_at)
  VALUES ($1, $2, $3, Now()) RETURNING id;`;
  return db.query(query, [owner_id, categoryId, name])
    .then(data => {
      return data.rows[0];
    })
    .catch(error => {
      throw error;
    });
};

const deleteItem = (itemId) => {
  const query = `DELETE FROM items WHERE id = $1;`
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




module.exports = {
  getItemsForCategory,
  getAllItemsOfUser,
  addItem,
  deleteItem,
  updateItem,
  findNextCategoryId
};
