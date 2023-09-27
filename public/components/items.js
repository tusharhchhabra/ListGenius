$(() => {
  const $main = $('#main-content');
  window.items = {};

  function generateItemHtml(item) {
    return `
      <li>
        <div class="item-wrapper" data-id="${item.id}">
          <span>${item.name}</span>
        </div>
      </li>`;
  }

  function generateItemsHtml(items) {
    const itemsListHtml = items.map(item => {
      return generateItemHtml(item);
    }).join("\n");

    const categoryName = window.selectedCategory ? window.selectedCategory.name : "";

    return `
      <span class="content-heading">${categoryName}</span>
      <ul id="items-list">
        ${itemsListHtml}
      </ul>
    `;
  }

  // Update items view
  function updateItemsView(items) {
    $items.empty();
    console.log($items.html());
    const itemsHtml = generateItemsHtml(items);
    $items.append(itemsHtml);
    views_manager.show("items");
  }
  window.items.updateItems = updateItemsView;

  console.log("hello");
  updateItemsView(itemsEx);
});
