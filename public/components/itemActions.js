$(() => {
  const $main = $('#main-content');

  $main.on("mouseenter", ".item-wrapper", function() {
    const itemId = $(this).data('id');
    const $actionButtons = $(`
      <div class="action-buttons" data-id="${itemId}">
        <i class="fa-solid fa-trash"></i>
        <i class="fa-solid fa-pen"></i>
      </div>
    `);
    $(this).append($actionButtons);
  });

  // Show action buttons on hover
  $main.on("mouseleave", ".item-wrapper", function() {
    $(this).find('.action-buttons').remove();
  });

  // Delete
  $main.on("click", ".delete-item-button", function() {
    const itemId = $(this).parent().data('id');
    deleteItem(itemId);
  });

  // Reassign category
  $main.on("click", ".reassign-category-button", function() {
    const itemId = $(this).parent().data('id');
    window.updateAssignCategoryView(window.categories);
    window.items.itemIdBeingEdited = itemId;
    views_manager.show("assignCategory");
  });
});
