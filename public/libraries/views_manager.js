$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.$categories = $(`<div id="categories"></div>`);
  window.$items = $(`<div id="items"></div>`);
  window.$newItemPanel = $(`
    <section id="new-item">
      <span class="content-heading">New Item</span>
      <input id="new-item-title" placeholder="Enter item">
      <div id="suggested-categories"></div>
      <button id="save-item-button">Done</button>
    </section>
  `);
  window.$assignCategoryPanel = $(`<div id="assign-category"></div>`);
  window.$newItemButton = $(`
    <button id="new-item-button">
      New Item
    </button>
  `);
  window.$profile = $(``);
  window.$home = $(`<div>
  <h1>Your magical wish list</h1>
  <h2>Powered by AI</h2>
  <button id="get-started-button">GET STARTED</button>
</div>
`);

  window.views_manager.show = function(item) {
    $categories.detach();
    $items.detach();
    $newItemPanel.detach();
    $assignCategoryPanel.detach();
    $newItemButton.detach();
    $profile.detach();
    $home.detach();

    switch (item) {
      case 'categories':
        $main.append($categories);
        $main.append($newItemButton);
        break;
      case 'items':
        $main.append($items);
        $main.append($newItemButton);
        break;
      case 'newItem':
        $main.append($newItemPanel);
        break;
      case 'assignCategory':
        $main.append($assignCategoryPanel);
        break;
      case 'home':
        $main.append($home);
        break;
      case 'profile':
        $main.append($profile);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('home');
        }, 2000);

        break;
      }
    }
  };
});
