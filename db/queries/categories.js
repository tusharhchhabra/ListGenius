const db = require('../connection');

/* fetching the current user's categories */
const getCategoriesForUser = (userId) => {
  const query = `SELECT * FROM categories
  WHERE owner_id = $1`;
  return db.query(query,[userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

/* Fetch Categories and count of all items in that particular*/

const getCategory = (categoryId) => {
  const query = `SELECT categories.*, COUNT(items.id) AS total_items
  FROM categories
  JOIN items
  ON categories.id = categories_id
  WHERE categories.id = $1
  GROUP BY categories.id;`;
  return db.query(query,[categoryId])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/* Adding a new category */

const addCategory = (categoryId, owner_id, categoryName) => {
  const query = `INSERT INTO categories(owner_id, name, created_at)
  VALUES ($2, $3, now()) RETURNING id;`
  return db.query(query, [categoryId, owner_id, categoryName])
  .then(data => {
    return data.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

const deleteCategory = (categoryId) => {
  const query = `DELETE FROM categories WHERE id = $1;`
  return db.query(query, [categoryId])
  .catch((err) => {
    console.log(err.message);
  });
}

const updateCategory = (categoryId, name) => {
  const query = `UPDATE categories
  SET name = $1
  WHERE id = $2 RETURNING $2;`
  return db.query(query,[name, categoryId])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = {
  getCategoriesForUser,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory
};
