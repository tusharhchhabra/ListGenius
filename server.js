// load .env data into process.env
require('dotenv').config();


// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');


const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
app.use(cookieParser());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homeApiRoute = require('./routes/home');
const authenticate = require("./routes/authenticate");
const userApiRoutes = require('./routes/users-api');
const categoriesApiRoutes = require('./routes/categories-api');
const itemsApiRoutes = require('./routes/items-api');
const gptApiRoutes = require('./routes/catergorize-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/home', homeApiRoute);
app.use('/login', authenticate);
app.use('/api/users', userApiRoutes);
app.use('/api/categories', categoriesApiRoutes);
app.use('/api/items', itemsApiRoutes);
app.use('/api/categorize', gptApiRoutes)
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


