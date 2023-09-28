$(() => {
  const $main = $('#main-content');
  window.categories = {};

  getCategoriesForUsers()
    .then(response => {
      window.categories.categoryObjs = response.categories;
      updateCategoriesView(response.categories);
      views_manager.show("categories");
    });

  function generateCategoriesHtml(categories) {
    const categoriesListHtml = categories.map(category => {
      return `
      <li>
        <button class="category-button" data-id="${category.id}">
          ${category.name}
        </button>
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
    const category = categories.categoryObjs.find(category => category.id === categoryId);

    console.log(category)

    getItemsForCategory(categoryId)
      .then(function(response) {
        const items = response.items;
        window.items.itemObjs = items;
        window.selectedCategory = category;
        console.log(items);
        window.items.update(items);
        views_manager.show('items');
      })
      .catch(err => {
        console.log(err.message);
      });
  });
});
