// GET / UPDATE User Profile
function login(userId) {
  return $.ajax({
    method: "GET",
    url: `/login/${userId}`
  });
}

function updateUser(data) {
  return $.ajax({
    method: "PATCH",
    url: "/api/users",
    data
  });
}

// GET ALL CATEGORIES w/ ITEM COUNT
function getCategoriesForUser() {
  return $.ajax({
    method: "GET",
    url: "/api/categories"
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

function getItemsForCategory(id) {
  return $.ajax({
    method: "GET",
    url: `/api/categories/${id}`
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

function deleteItem(id) {
  return $.ajax({
    method: "DELETE",
    url: `/api/items/${id}`
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

function updateItem(item) {
  return $.ajax({
    method: "PATCH",
    url: `/api/items/${item.id}`,
    data: { item }
  });
}
