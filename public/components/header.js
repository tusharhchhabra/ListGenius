$(() => {
  const $pageHeader = $('#nav-container');
  let currentUser = null;

  // Generate nav bar HTML
  function generateNavHtml(user) {
    if (!user) {
      return `
        <nav>
          <button id="logo-button">
            <img src="assets/logo.png" />
            </button>
            <button id="login-button">
              <span class="login_button">Login</span>
            </button>
        </nav>
      `;
    }
    return `
      <nav>
        <img id="logo" src="assets/logo.png" />
        <button id="user-profile-link">
          <span>${user.name}</span>
          <img id="profile" src="assets/profile.png" />
          <span class="logout-button">Logout</span>
        </button>
      </nav>
    `;
  }

  // Update header (nav bar)
  function updateHeader(user) {
    currentUser = user;
    $pageHeader.find('nav').remove();
    const navHtml = generateNavHtml(user);
    $pageHeader.append(navHtml);
  }

  // Clicking the logo takes the user to Categories
  $("header").on("click", 'logo-button', function() {
    getUserCategories()
      .then(function(json) {
        // Show categories page
      });
  });

  // Login button action
  $("header").on('click', '.login-button', () => {
    // Show login page
  });

  // Logout button action
  $("header").on('click', '.logout-button', () => {
    logOut().then(() => {
      updateHeader(null);
    });
  });


  // Upon page load
  // Store updateHeader function for global use
  window.header = {};
  window.header.update = updateHeader;

  // Get user details
  getUserDetails()
    .then(function(json) {
      updateHeader(json.user);
    });
});

