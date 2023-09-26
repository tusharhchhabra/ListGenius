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
  function updateCategoriesView(categories) {
    $main.find("#categories").remove();
    const categoriesHtml = generateCategoriesHtml(categories);
    $main.append(categoriesHtml);
  }
  window.categories.update = updateCategoriesView;

  // Clicking a category takes user to items
  $("#categories").on("click", '.category-button', function() {
    const categoryId = $(this).data("id");
    const category = categories.find(category => category.id === categoryId);

    getItemsForCategory(categoryId)
      .then(function(items) {
        window.selectedCategory = category;
        views_manager.show('items', items);
      });
  });
});
