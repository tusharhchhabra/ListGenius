// GET / UPDATE User Profile
function getUser(data) {
  return $.ajax({
    method: "GET",
    url: "/api/users/:id",
    data
  });
}

function updateUser(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/:id",
    data
  });
}

// GET ALL CATEGORIES w/ ITEM COUNT
function getCategoriesForUsers(data) {
  return $.ajax({
    method: "GET",
    url: "/api/categories",
    data
  });
}

// Add category
function addCategory(data) {
  return $.ajax({
    method: "POST",
    url: "/api/categories/:id",
    data
  });
}


// UPDATE CATGEORY
function updateCategory(data) {
  return $.ajax({
    method: "POST",
    url: "/api/categories/:id",
    data
  });
}

function deleteCategory(data) {
  return $.ajax({
    method: "POST",
    url: "/api/categories/:id",
    data
  });
}

// GET ITEMS FOR CATEGORY

function getItemsForCategory() {
  return $.ajax({
    method: "GET",
    url: "/api/categories/:id"
  });
}

// // GET ALL ITMES + ADD ITEM
// function getItems() {
//   return $.ajax({
//     method: "GET",
//     url: "/api/items"
//   });
// }

function addItem(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items/",
    data
  });
}

function deleteItem(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items/:id",
    data
  });
}

function updateItemName(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items/:id",
    data
  });
}

function updateItemCategory(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items/:id",
    data
  });
}

