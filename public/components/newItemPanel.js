$(() => {
  const $main = $('#main-content');
  window.newItemPanel = {};

  function generateSuggestedCategoriesHtml(categoryNames) {
    return categoryNames.map(name => `
        <button class="suggested-category-button">
          ${name}
        </button>
      `
    ).join("\n");
  }

  // Add suggested category buttons to the New Item panel
  function addSuggestedCategoriesView(categoryNames) {
    const $suggestedCategoriesContainer = $newItemPanel.find("#suggested-categories");
    $suggestedCategoriesContainer.empty();
    const suggestedCategoriesHtml = generateSuggestedCategoriesHtml(categoryNames);
    $suggestedCategoriesContainer.append(suggestedCategoriesHtml);
  }
  window.newItemPanel.addSuggestedCategories = addSuggestedCategoriesView;

  // Clicking a category to set it as the preferred category
  $main.on("click", ".suggested-category-button", function() {
    const categoryName = $(this).data("name");
    const category = categories.find(category => category.name === categoryName);
    window.newItemPanel.selectedCategory = category;
  });

  // Clicking the Done button saves the item
  $main.on("click", "#save-new-item-button", function() {
    const itemTitle = $main.find("#new-item-title").val();
    const item = {
      owner_id: currentUser.id,
      categories_id: newItemPanel.selectedCategory.id || 0,
      name: itemTitle
    };

    addItem(item)
      .then(() => {
        getItemsForCategory(userId, categoryId);
      })
      .then(items => {
        window.items = items;
        window.selectedCategory = newItemPanel.selectedCategory;
        window.items.update(items);
        views_manager.show('items');
        newItemPanel.selectedCategory = null;
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
