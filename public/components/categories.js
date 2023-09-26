$(() => {
  const $main = $('#main-content');
  window.categories = {};

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
    <div id="categories">
      <span class="content-heading">Categories</span>
      <ul>
        ${categoriesListHtml}
      </ul>
    </div>
    `;
  }

  // Update categories
  function updateCategories(categories) {
    $main.find("#categories").remove();
    const categoriesHtml = generateCategoriesHtml(categories);
    $main.append(categoriesHtml);
  }
  window.categories.update = updateCategories;

  // Clicking a category takes user to items
  $("#categories").on("click", '.category-button', function() {
    const categoryId = $(this).data("id");
    const category = categories.find(category => category.id === categoryId);

    getItemsForCategory(categoryId)
      .then(function(items) {
        views_manager.show('items', items);
        window.selectedCategory = category;
      });
  });
});
