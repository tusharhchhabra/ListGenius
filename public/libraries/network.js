// GET / UPDATE User Profile
function getUserDetails() {
  console.log(getUserDetails);
  return $.ajax({
    method: "GET",
    url: "/api/profile"
  });
}

function updateUserDetails(data) {
  return $.ajax({
    method: "POST",
    url: "/api/profile",
    data
  });
}

// GET ALL CATEGORIES w/ ITEM COUNT
function getUserCategories() {
  return $.ajax({
    method: "GET",
    url: "/api/categories"
  });
}


// GET ALL CATEGORIES / UPDATE CATGEORY
function assignCategory() {
  return $.ajax({
    method: "GET",
    url: "/api/assigncategory"
  });
}

function assignCategory(data) {
  return $.ajax({
    method: "POST",
    url: "/api/assigncategory",
    data
  });
}

// GET ITEMS FOR CATEGORY

function getItemsForCategory() {
  return $.ajax({
    method: "GET",
    url: "/api/itemsforcategory"
  });
}

// GET ALL ITMES + ADD ITEM
function getItems() {
  return $.ajax({
    method: "GET",
    url: "/api/items"
  });
}

function addItems(data) {
  return $.ajax({
    method: "POST",
    url: "/api/items",
    data
  });
}


