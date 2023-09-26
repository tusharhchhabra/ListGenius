$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $categories.detach();
    $items.detach();
    $newItemPanel.detach();
    $assignCategoryPanel.detach();
    $profile.detach();
    $home.detach();

    switch (item) {
      case 'categories':
        $main.append($categories);
        break;
      case 'items':
        $main.append($items);
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
  }

});
