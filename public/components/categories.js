$(() => {
  const $main = $('#main-content');
  window.categories = {};

  function generateCategoriesHtml(categories) {
    const categoriesListHtml = categories.map(category => {
      return `
      <li>
        <div class="category-div" data-id="${category.id}">
          ${category.name}
          <div class="item-count">
            5 Items
          </div>
        </div>
      </li>`;
    }).join("\n");

    return `
      <span class="content-heading">Categories</span>
      <ul>
        ${categoriesListHtml}
      </ul>
    `;
  }

  // Update categories view
  function updateCategoriesView(categories) {
    $categories.empty();
    const categoriesHtml = generateCategoriesHtml(categories);
    $categories.append(categoriesHtml);
  }
  window.categories.update = updateCategoriesView;

  // Clicking a category takes user to items
  $main.on("click", ".category-button", function() {
    const categoryId = $(this).data("id");
    const category = categories.find(category => category.id === categoryId);

    getItemsForCategory(userId, categoryId)
      .then(function(items) {
        window.items = items;
        window.selectedCategory = category;
        window.items.updateItems(items);
        views_manager.show('items');
      })
      .catch(err => {
        console.log(err.message);
      });
  });
  updateCategoriesView(categoriesEx);
  views_manager.show('categories');
});
