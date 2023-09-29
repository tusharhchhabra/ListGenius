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
          addSuggestedCategoriesView([response.category]);
          isFetchingCategory = false;
          window.newItemPanel.selectedCategoryName = response.category;
        })
        .catch((error) => {
          console.error('API call failed:', error);
          isFetchingCategory = false;
        });
    }, 1000);
  });


  // Clicking the Done button saves the item
  $main.off('click', '#save-item-button').on("click", "#save-item-button", function() {
    const itemTitle = $main.find("#new-item-title").val();
    const categoryName = newItemPanel.selectedCategoryName;
    let categoryId;
    const existingCategory = window.categories.categoryObjs.find(category => category.name === categoryName);

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      categoryId = null;
    }

    console.log("save button clicked");

    addItem(itemTitle, categoryId, categoryName)
      .then(response => {
        const categories = window.categories.categoryObjs;
        if (response.newCategory) {
          response.newCategory["total_items"] = "1"
          categories.push(response.newCategory);
          window.categories.update(categories);
          window.selectedCategory = response.newCategory;

          window.items.itemObjs = [response.item];
          window.items.update(window.items.itemObjs);
          views_manager.show("items");
        } else {
          getItemsForCategory(existingCategory.id)
            .then((response) => {
              existingCategory.total_items++;
              window.categories.update(categories);
              window.selectedCategory = existingCategory;

              window.items.itemObjs = response.items;
              window.items.update(response.items);
              views_manager.show("items");
            });
        }
        newItemPanel.selectedCategory = null;
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
