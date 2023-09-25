const db = require('../connection');
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

module.exports = {
  getCategory,
};
