$(() => {
  const $main = $('#main-content');
  window.newItemPanel = {};
  window.$newItemPanel = $(`
    <section id="new-item">
      <span class="content-heading">New Item</span>
      <input id="new-item-title" placeholder="Enter item">
      <div id="suggested-categories"></div>
      <button id="save-new-item-button">Done</button>
    </section>
  `);

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
      name: itemTitle,
      categories_id: newItemPanel.selectedCategory.id || 0,
      owner_id: user.id // Taken from the global user object
    };

    addItem(item)
      .then(() => {
        getItemsForCategory(categoryId);
      })
      .then(items => {
        window.selectedCategory = newItemPanel.selectedCategory;
        views_manager.show('items', items);
        newItemPanel.selectedCategory = null;
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
