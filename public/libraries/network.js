// GET / UPDATE User Profile
function getUserDetails() {
  console.log(getUserDetails);
  return $.ajax({
    method: "GET",
    url: "/api/profile"
  });
};

function updateUserDetails(data) {
  return $.ajax({
    method: "POST",
    url: "/api/profile",
    data
  });
};

// GET ALL CATEGORIES w/ ITEM COUNT
function getUserCategories() {
  return $.ajax({
    method: "GET",
    url: "/api/categories"
  });
};


// GET ALL CATEGORIES / UPDATE CATGEORY
function assignCategory() {
  
};
