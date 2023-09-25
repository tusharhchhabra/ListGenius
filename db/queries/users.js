const db = require('../connection');

/* Fetch all users */
const getUsers = (id) => {
  const query = `SELECT * FROM users WHERE id = $1;`
  return db.query(query,[id])
    .then(data => {
      return data.rows[0];
    });
};







module.exports = {
  getUsers
};
