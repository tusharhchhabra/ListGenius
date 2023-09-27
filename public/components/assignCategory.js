$(() => {
  const $main = $('#main-content');

  function generateCategoryHtml(category) {
    return `
      <li>
        <button class="assign-category-button" data-id="${category.id}">
          <span>${category.name}</span>
        </button>
      </li>`;
  }

  function generateCategoriesHtml(categories) {
    const categoryListHtml = categories.map(category => {
      return generateCategoryHtml(category);
    }).join("\n");

    return `
      <span class="content-heading">Set Category</span>
      <ul id="categories-list">
        ${categoryListHtml}
      </ul>
    `;
  }

  // Update categories list
  function updateAssignCategoryView(categories) {
    $assignCategoryPanel.empty();
    const categoriesHtml = generateCategoriesHtml(categories);
    $assignCategoryPanel.append(categoriesHtml);
    views_manager.show("assignCategory");
  }
  window.updateAssignCategoryView = updateAssignCategoryView

  // Update category on click, then take user to the new category
  $main.on("click", ".assign-category-button", function() {
    const categoryId = $(this).data("id");
    const category = categories.find(category => category.id === categoryId);

    updateItemCategory(itemIdBeingEdited, categoryId)
      .then(function() {
        return getItemsForCategory(currentUser.id, categoryId)
      })
      .then(function(items) {
        window.items = items;
        selectedCategory = category;
        window.items.updateItems(items);
        views_manager.show('items');
        itemBeingEdited = null;
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
