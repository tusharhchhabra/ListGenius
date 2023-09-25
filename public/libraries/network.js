// GET / UPDATE User Profile
const getUserDetails = function() {
  console.log(getUserDetails);
  return $.ajax({
    method: "GET",
    url: "/api/profile"
  });
};

const updateUserDetails = function(data) {
  return $.ajax({
    method: "POST",
    url: "/api/profile",
    data
  });
};

const

// GET / UPDATE CATEGORY
const 
