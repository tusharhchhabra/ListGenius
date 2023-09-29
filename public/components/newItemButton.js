$(() => {
  const $main = $('#main-content');

  // Clicking takes the user to New Item Panel
  $main.on("click", "#new-item-button", function() {
    views_manager.show("newItem");
  });
});

