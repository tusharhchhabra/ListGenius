$(() => {
  // Clicking takes the user to New Item Panel
  $('#new-item-button').on("click", function() {
    views_manager.show("newItemPanel");
  });
});

