$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.$categories = $(`<div id="categories"></div>`);
  window.$items = $(`<div id="items"></div>`);
  window.$newItemButton = $(`
    <div id="new-item-button">
      New Item
    </div>
  `);
  window.$newItemPanel = $(`
    <div id="new-item">
      <span class="new-item-content-heading">New Item</span>
      <input id="new-item-title" placeholder="Enter item" autocomplete="off">
      <div id="suggested-categories"></div>
      <div id="save-item-button">Done</div>
    </div>
  `);
  window.$assignCategoryPanel = $(`<div id="assign-category"></div>`);
  window.$profile = $(`<div id="profile"></div>`);
  window.$home = $(`
    <div>
      <h1>Your magical wish list</h1>
      <h2>Powered by AI</h2>
      <button id="get-started-button">GET STARTED</button>
    </div>
  `);

  window.views_manager.show = function(item) {
    $categories.detach();
    $items.detach();
    $newItemButton.detach();
    $newItemPanel.detach();
    $assignCategoryPanel.detach();
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
