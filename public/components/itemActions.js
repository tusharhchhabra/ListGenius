$(() => {
  const $main = $('#main-content');

  $main.on("mouseenter", ".item", function() {
    const itemId = $(this).data('id');
    const $actionButtons = $(`
      <div class="action-buttons" data-id="${itemId}">
        <button class="edit-item">Edit</button>
        <button class="delete-item">Delete</button>
        <button class="view-item">View</button>
      </div>
    `);
    $(this).append($actionButtons);
  });

  $main.on("mouseleave", ".item", function() {
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
    window.items.itemCurrentlyEditing = itemId;
    views_manager.show("reassignCategory");
  });
});
