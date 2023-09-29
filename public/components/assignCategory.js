$(() => {
  const $main = $('#main-content');

  function generateCategoryHtml(category) {
    return `
      <li>
        <div class="assign-category-div" data-id="${category.id}">
          <span>${category.name}</span>
        </div>
      </li>`;
  }

  function generateCategoriesHtml(categories) {
    const categoryListHtml = categories.map(category => {
      return generateCategoryHtml(category);
    }).join("\n");

    return `
    <div id="assign-categories">
      <span class="setCategory-content-heading">Set Category</span>
      <ul id="categories-list">
        ${categoryListHtml}
      </ul>
      </div>
    `;
  }

  // Update categories list
  function updateAssignCategoryView(categories) {
    $assignCategoryPanel.empty();
    const categoriesHtml = generateCategoriesHtml(categories);
    $assignCategoryPanel.append(categoriesHtml);
    views_manager.show("assignCategory");
  }
  window.updateAssignCategoryView = updateAssignCategoryView;

  // Update category on click, then take user to the new category
  $main.on("click", ".assign-category-div", function() {
    const categoryId = $(this).data("id");

    const category = categories.categoryObjs.find(category => category.id === categoryId);

    const item = window.items.itemToEdit;
    const previousCategoryId = item.categories_id;

    item.categories_id = categoryId;

    updateItem(item)
      .then(function() {
        const previousCategory = window.categories.categoryObjs.find(category => category.id === previousCategoryId);
        let previousCount = parseInt(previousCategory.total_items);
        previousCount--;
        previousCategory.total_items = previousCount + "";
        let currentCount = parseInt(category.total_items);
        currentCount++;
        category.total_items = currentCount+"";
        window.categories.update(window.categories.categoryObjs);
        return getItemsForCategory(categoryId);
      })
      .then(function(response) {
        window.items.itemObjs = response.items;
        window.selectedCategory = category;
        window.items.update(response.items);
        views_manager.show('items');
        window.items.itemToEdit = null;
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
