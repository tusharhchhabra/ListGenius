$(() => {
  const $main = $('#main-content');

  $main.on("mouseenter", ".item-wrapper", function() {
    const itemId = $(this).data('id');
    const $actionButtons = $(`
      <div class="action-buttons" data-id="${itemId}">
        <button class="delete-item-button">Delete</button>
        <button class="reassign-category-button">Change Category</button>
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
    deleteItem(itemId)
      .then(() => {
        return getItemsForCategory(window.selectedCategory.id)
      })
      .then(items => {
        window.items.itemObjs = items;
        window.items.update(items);
      });
  });

  // Reassign category
  $main.on("click", ".reassign-category-button", function() {
    const itemId = $(this).parent().data('id');
    window.updateAssignCategoryView(window.categories.categoryObjs);
    const item = window.items.itemObjs.find(item => item.id === itemId);
    window.items.itemToEdit = item;
    views_manager.show("assignCategory");
  });
});
