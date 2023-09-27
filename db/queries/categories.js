const db = require('../connection');

/* fetching the current user's categories w/ item count*/
const getCategoriesForUser = (userId) => {
  const query = `SELECT categories.* AS category, COUNT(items.id) AS total_items
  FROM categories
  JOIN items
  ON categories.id = items.categories_id
  WHERE categories.owner_id = $1
  GROUP BY categories.id;`;
  return db.query(query,[userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// Fetch categories w/o count
const getCategoriesIDForUser = (userId) => {
  const query = `SELECT categories.id AS categoryId
  FROM categories
  WHERE categories.owner_id = $1
  GROUP BY categories.id;`;
  return db.query(query,[userId])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};


/* Adding a new category */

const addCategory = (owner_id, categoryName) => {
  const query = `INSERT INTO categories(owner_id, name, created_at)
  VALUES ($1, $2, now()) RETURNING *;`;
  return db.query(query, [owner_id, categoryName])
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
  addCategory,
  deleteCategory,
  updateCategory,
  getCategoriesIDForUser
};
