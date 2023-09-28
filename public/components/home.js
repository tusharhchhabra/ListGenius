$(() => {
  const $main = $('#main-content');

  // Generate home page HTML
  function generateHomeHtml() {
    return `
    <div class="home">
      <h1>Your magical wish list</h1>
      <h2>Powered by AI</h2>
      <button id="get-started-button">GET STARTED</button>
    </div>
    `;
  }

  /* Get started button action
  On click user is redirected to /login/1 which handles authentication.
  '/login/1' will then redirect user again to '/categories'
  This is bypassing the login/signup logic and automatically
  logging in user 1 from the DB for demo purposes
  */
  $main.on("click", "#get-started-button", function() {
    // const redirectPath = '/login/1';
    // window.location.href = redirectPath;

    login(1)
      .then((response) => {
        window.currentUser = response.user

        getCategoriesForUser()
          .then(response => {
            window.categories.categoryObjs = response.categories;
            window.categories.update(response.categories);
            window.header.update(window.currentUser);
            views_manager.show("categories");
          });
      });
  });

  views_manager.show("home");
});

