// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const cookieSession = require('cookie-session');
const express = require('express');
const morgan = require('morgan');


const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['key']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homepageApiRoute = require('/routes/homepage.js')
// const authenticate = require("./routes/authenticate");
const userApiRoutes = require('./routes/users-api');
// const categoriesApiRoutes = require('./routes/categories-api');
// const itemsApiRoutes = require('./routes/new-item-api');
// const itemsForCategoryApiRoutes = require("./routes/itemsForCategory-api");
// const updateCategoryApiRoutes = require('./routes/update-category-api');
// const profileAPIRoutes = require('./routes/profile-api');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/home', homepageApiRoute);
app.use('/api/users', userApiRoutes);
// app.use('/login/:id', authenticate);
// app.use('/api/users', userApiRoutes);
// app.use('/api/categories', categoriesApiRoutes);
// app.use('/api/items', itemsApiRoutes);
// app.use('/api/itemsforcategory', itemsForCategoryApiRoutes);
// app.use('/api/updatecategory', updateCategoryApiRoutes);
// app.use('/api/profile', profileAPIRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
