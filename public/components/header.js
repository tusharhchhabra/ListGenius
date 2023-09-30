$(() => {
  const $header = $('#nav-container');

  // Generate nav bar HTML
  function generateNavHtml(user) {
    if (!user) {
      return `
        <nav>
          <div id="logo-button">
            <img src="assets/logo.png" />
          </div>
          <button id="login-button">
            <span>Login</span>
          </button>
        </nav>
      `;
    }
    return `
      <nav>
        <div id="logo-button">
          <img src="assets/logo.png" />
        </div>
        <div id="profile-section">
          <button id="user-profile-link">
            <span>Logged in as: ${user.name}</span>
            <i class="fa-solid fa-circle-user"></i>
          </button>
          <button id="logout-button">Logout</button>
        </div>
      </nav>
    `;
  }

  // Update header (nav bar)
  function updateHeader(user) {
    $header.find('nav').remove();
    const navHtml = generateNavHtml(user);
    $header.append(navHtml);
  }

  // Clicking the logo takes the user to Categories
  $header.on("click", "#logo-button", function () {
    if (currentUser) {
      views_manager.show("categories");
    } else {
      views_manager.show("home");
    }
  });

  // Login button action
  $header.on('click', '#login-button', () => {
    if (window.currentUser) {
      updateHeader(window.currentUser);
    } else {
      login(1)
        .then((response) => {
          window.currentUser = response.user;

          getCategoriesForUser()
            .then(response => {
              window.categories.categoryObjs = response.categories;
              window.categories.update(response.categories);
              window.header.update(window.currentUser);
              views_manager.show("categories");
            });
        });
    }
    views_manager.show("categories");
  });

  // Logout button action
  $header.on('click', '#logout-button', () => {
    updateHeader(null);
    views_manager.show("home");
  });

  // Login button action
  $header.on('click', '#user-profile-link', () => {
    window.userProfile.update(currentUser);
    views_manager.show("profile");
  });

  // Upon page load
  // Store updateHeader function for global use
  window.header = {};
  window.header.update = updateHeader;
  updateHeader(null);
});

