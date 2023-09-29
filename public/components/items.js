$(() => {
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
    let itemsListHtml = ``;
    if (items.length > 0) {
      itemsListHtml = items.map(item => {
        return generateItemHtml(item);
      }).join("\n");
    }

    const categoryName = window.selectedCategory ? window.selectedCategory.name : "";

    return `
    <div id="items"></div>
      <span class="items-content-heading">${categoryName}</span>
      <ul id="items-list">
        ${itemsListHtml}
      </ul>
    <div id="items"></div>
    `;
  }

  // Update items view
  function updateItemsView(items) {
    $items.empty();
    const itemsHtml = generateItemsHtml(items);
    $items.append(itemsHtml);
  }
  window.items.update = updateItemsView;
});
