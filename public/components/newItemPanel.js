$(() => {
  const $main = $('#main-content');
  window.newItemPanel = {};
  let timer;

  function generateSuggestedCategoriesHtml(categoryNames) {
    return categoryNames.map(name => `
        <div class="suggested-category-button" data-name="${name}">
          ${name}
        </div>
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
  });


  let isFetchingCategory = false;
  $main.off('input', '#new-item-title').on('input', "#new-item-title", function() {
    console.log("hello");

    clearTimeout(timer);

    const inputValue = $(this).val();

    timer = setTimeout(() => {
      if (isFetchingCategory) {
        return;
      }
      isFetchingCategory = true;

      categorize(inputValue)
        .then(response => {
          addSuggestedCategoriesView([response.category])
          isFetchingCategory = false;
          window.newItemPanel.selectedCategoryName = categoryName;
        })
        .catch((error) => {
          console.error('API call failed:', error);
          isFetchingCategory = false
        });
    }, 1000);
  });


  // Clicking the Done button saves the item
  $main.on("click", "#save-item-button", function() {
    const itemTitle = $main.find("#new-item-title").val();
    const categoryName = newItemPanel.selectedCategoryName
    const category = window.categories.find(category => category.name === selectedCategoryName)

    addItem(itemTitle, category["id"], categoryName)
      .then(() => {
        getItemsForCategory(categoryId);
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
