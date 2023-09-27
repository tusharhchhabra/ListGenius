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
      <button id="save-new-item-button">Done</button>
    </section>
  `);
  window.$assignCategoryPanel = $(`<div id="assign-category"></div>`);
  window.$newItemButton = $(``);
  window.$profile = $(``);
  window.$home = $(``);

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
        window.newItemButton.add();
        break;
      case 'items':
        $main.append($items);
        window.newItemButton.add();
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
