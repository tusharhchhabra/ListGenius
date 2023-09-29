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
            ${category.total_items} items
          </div>
        </div>
      </li>`;
    }).join("\n");

    return `
    <div id="categories"></div>
      <span class="categories-content-heading">Categories</span>
      <ul id="categories-list">
        ${categoriesListHtml}
      </ul>
    <div id="categories"></div>
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
  $main.on("click", ".category-div", function() {
    const categoryId = $(this).data("id");
    const category = categories.categoryObjs.find(category => category.id === categoryId);

    getItemsForCategory(categoryId)
      .then(function(response) {
        const items = response.items;
        window.items.itemObjs = items;
        window.selectedCategory = category;
        window.items.update(items);
        views_manager.show('items');
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
