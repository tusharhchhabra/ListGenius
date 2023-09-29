$(() => {
  const $main = $('#main-content');

  $main.on("mouseenter", ".item-wrapper", function() {
    const itemId = $(this).data('id');

    const $actionButtons = $(`
      <div class="action-buttons" data-id="${itemId}">
        <i class="delete-item-button fa-solid fa-trash"></i>
        <i class="reassign-category-button fa-solid fa-pen"></i>
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
    const currentCategoryId = window.items.itemObjs[0].categories_id;
    const categories = window.categories.categoryObjs;
    const currentCategory = categories[currentCategoryId - 1];
    let previousCount = parseInt(currentCategory.total_items);
    while (previousCount > 0) {
      previousCount--;
    }
    currentCategory.total_items = previousCount + "";
    window.categories.update(window.categories.categoryObjs);

    deleteItem(itemId)
      .then(() => {
        return getItemsForCategory(window.selectedCategory.id);
      })
      .then(response => {
        window.items.itemObjs = response.items;
        window.items.update(response.items);
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
